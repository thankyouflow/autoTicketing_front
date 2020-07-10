import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import { post } from 'axios';
import 'date-fns';
import ErrorCatch from './ErrorCatch';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
   TextField: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    transform: 'scale(3.2)',
    margin: theme.spacing(10),
    backgroundColor: theme.palette.secondary.light,
  },
  submit: {
    margin: theme.spacing(3, 0, 9),
  },
});


class Login extends React.Component {



  constructor(props) {
        super(props);
        this.state = {
            url: '',
            xpath: '',
            time: '',
            }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
  }

  handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

  handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
    })}


  addCustomer(){
        const url = 'http://10.106.0.87:8000/api/ticketing/';
        const formData = new FormData();
        formData.append('url', this.state.url)
        formData.append('xpath', this.state.xpath)
        formData.append('time', this.state.time)
        formData.append('id', this.props.location.state.id)
        formData.append('pw', this.props.location.state.pw)
        formData.append('site', this.props.location.state.site)
        return post(url, formData)
    }


  render() {
          const {classes} = this.props;
          const { params } = this.props.match;
          console.log(this.props.location.state)

          return (
            <Container component="main" maxWidth="xs" >
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <FlashAutoIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Auto Ticketing
                </Typography>
                  {/*<DateAndTimePickers onSubmit={this.onSearchSubmit}/>*/}
                  <form noValidate onSubmit={this.handleFormSubmit}>
                  <TextField
                    id="datetime-local"
                    label="예매 시작 시간"
                    type="datetime-local"
                    name="time"
                    defaultValue="2020-06-20T23:14"
                    className={classes.TextField}
                    value={this.state.time}
                    onChange={this.handleValueChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="url"
                    label="예매 공연 url"
                    type="url"
                    name="url"
                    autoFocus
                    value={this.state.url}
                    className={classes.TextField}
                    onChange={this.handleValueChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="xpath"
                    label="xpath"
                    type="xpath"
                    id="xpath"
                    value={this.state.xpath}
                    onChange={this.handleValueChange}
                  />
                  <ErrorCatch>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onSubmit={this.addCustomer}
                  >예매하기</Button>
                  </ErrorCatch>
                      </form>

              </div>
            </Container>
          );
        };
}

export default withStyles(styles)(Login);