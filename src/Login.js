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
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { navigate } from "@reach/router"

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TextField: {
    // marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '35ch',
  },
  title: {
    margin: theme.spacing(0, 0, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    transform: 'scale(3.2)',
    margin: theme.spacing(10),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 9),
  },
});

class Login extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            site: '',
            id: '',
            pw: '',
            }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
        // this.componentDidMount = this.componentDidMount.bind(this)
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
        const url = '/ticketing';
        const formData = new FormData();
        formData.append('site', this.state.site)
        formData.append('id', this.state.id)
        formData.append('pw', this.state.pw)
        return post(url, formData)
    }

   // componentDidMount() {
   //      fetch('api')
   //          .then(res=>res.json())
   //          .then(data=>this.setState({username:data.username}));
   //  }
   //
   // onFormSubmit = e => {
   //  	e.preventDefault();
   //      this.props.onSubmit(this.state);
   //  }

  render() {
          const {classes} = this.props;
          const site = 'https://accounts.interpark.com/authorize/ticket-pc?origin=https%3A%2F%2Fticket%2Einterpark%2Ecom%2FGate%2FTPLoginConfirmGate%2Easp%3FGroupCode%3D%26Tiki%3D%26Point%3D%26PlayDate%3D%26PlaySeq%3D%26HeartYN%3D%26TikiAutoPop%3D%26BookingBizCode%3D%26MemBizCD%3DWEBBR%26CPage%3DB%26GPage%3Dhttp%253A%252F%252Fticket%252Einterpark%252Ecom%252FTicket%252FGoods%252FGoodsInfo%252Easp%253FGoodsCode%253D20003285&postProc=IFRAME'


          return (
            <Container component="main" maxWidth="xs" >
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <FlashAutoIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                  Auto Ticketing
                </Typography>
                  <FormControl style={{ width: '60%', marginBottom: '15px'}} >
                    <InputLabel id="demo-simple-select-label">예매사이트</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name='site'
                      value={this.state.site}
                      onChange={this.handleValueChange}
                     >
                      <MenuItem
                          value={site}>
                          인터파크</MenuItem>
                      {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                      {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                    </Select>
                   </FormControl>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="id"
                    label="아이디"
                    type="id"
                    id="id"
                    className={classes.TextField}
                    value={this.state.id}
                    onChange={this.handleValueChange}
                  />
                 <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="pw"
                    label="비밀번호"
                    type="password"
                    id="pw"
                    className={classes.TextField}
                    value={this.state.pw}
                    onChange={this.handleValueChange}
                  />
                  <Link to={{
                      pathname : '/ticketing',
                      state : {
                          site : this.state.site,
                          id : this.state.id,
                          pw : this.state.pw
                      }
                        }} style={{ textDecoration: 'none', color: 'white', width: '68.5%'}}>
                      <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                          다음</Button>
                  </Link>
              </div>
            </Container>

          );
        };
}

export default withStyles(styles)(Login);