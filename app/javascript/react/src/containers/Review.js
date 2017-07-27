import React, { Component } from 'react';
import Vote from '../components/Vote';

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vote_count: 0,
      voteMessage: ''
    }

    this.handleVoteUp = this.handleVoteUp.bind(this)
    this.handleVoteDown = this.handleVoteDown.bind(this)
    this.changeVoteCount = this.changeVoteCount.bind(this)
  }

    handleVoteUp(event){
      event.preventDefault()
      this.changeVoteCount(1)
    }
    handleVoteDown(event){
      event.preventDefault()
      this.changeVoteCount(-1)
    }


  componentDidMount() {
    fetch(`/api/v1/locations/${this.props.locationId}/reviews/${this.props.review.id}`)
    .then(response => response.json())
    .then(review => {
      this.setState({ vote_count: review.vote_count })
    })
  }

  changeVoteCount(num) {
    fetch(`/api/v1/locations/${this.props.locationId}/reviews/${this.props.review.id}/votes`, {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify({user_vote:num})
    })
    .then(response => response.json())
    .then(body =>{
      if (body.vote === 'already voted') {
        this.setState({voteMessage: 'Woah there, one vote is enough!'})
      } else{
        console.log(body.vote)
        this.setState({vote_count: body.review.vote_count})
      }
    })
  }

  render() {

    let user_name;
    let user_image = ""
    if (this.props.review.user) {
        user_name = this.props.review.user.first_name
        user_image = this.props.review.user.profile_photo.url
        if (user_image === null) {
          user_image = "http://abcnews.go.com/images/Entertainment/ht_randy_jackson_idol_nt_130409_wmain.jpg"
        }
    }
    return(
      <div>
        <p>{this.state.voteMessage}</p>
        <div className="col s12">
          <div className="card ">
            <div className="row">
              <div className="col s2">
                <div className="center-align">
                  <Vote
                    handleChange={this.handleVoteUp}
                    button = "expand_less"
                  />
                </div>
                <div >
                  <p className="center-align">{this.state.vote_count}</p>
                </div>
                <div className="center-align">
                  <Vote
                    handleChange={this.handleVoteDown}
                    button = "expand_more"
                  />
                </div>
              </div>
              <div className="col s10">
                <div className="chip">
                  <img src={user_image}
                  alt="USERIMAGE"
                  height="60" width="60"
                  className= "circle" />
                  {user_name}
                </div>
                <p>Rating: {this.props.review.rating}<br/>
                {this.props.review.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Review
