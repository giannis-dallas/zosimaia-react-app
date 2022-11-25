//import React from 'react';
//import ReactDOM from 'react-dom';

import './App.scss';
import Allumni from './Allumni';
import './Loader.scss';
import Loader from './Loader';

import AlertIcon from 'mdi-react/AlertIcon';

let graduates=[];
const letters = ['Α','Β','Γ','Δ','Ε',"Ζ","Η","Θ","Ι","Κ","Λ","Μ",'Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω']

let now = new Date();
let last = now.getFullYear();
let dates = Array();
  for(let i = 1925; i <= last; i++) dates.push(i);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "",
            filterInitial: "Α",
            filterLocation:"",
            filterYear:"",
            filterJob:"",
            filteredGraduates:[],
            availableLocations:['ΙΩΑΝΝΙΝΑ','ΑΘΗΝΑ'],
            availableJobs:[],
            loaderVisible:true
        };
        this.updateInitial = this.updateInitial.bind(this)
        this.updateYear = this.updateYear.bind(this)
        this.updateNameInput = this.updateNameInput.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.updateJob = this.updateJob.bind(this)
      }

    componentDidMount(){
      fetch("https://zosimaia-app.onrender.com/newdata",{
          method: 'GET',
      })
      .then(res => res.json())
      .then( result => {
        console.log(result);
        graduates = [...result];
        this.setState({
          filteredGraduates : result.filter( (graduate) => graduate.Surname.charAt(0)==="Α" ),
          availableLocations:result.map( graduate => graduate.homeLocation).filter( (value, index, self) => self.indexOf(value) === index ),
          availableJobs:result.map( graduate => graduate.job).filter( (value, index, self) => self.indexOf(value) === index ),
          loaderVisible:false
        })    
      
      })  
    }

    updateInitial(letter) {
      if (letter==='*'){
        this.setState({
          filterInitial: "*",
          filteredGraduates : [...graduates]
        })
      }else{
        this.setState({
        filterInitial: letter,
        filteredGraduates : graduates.filter( (graduate) => graduate.Surname.charAt(0)===letter )
      })
      }
      console.log('this is the letter: ',letter);
    }

    updateYear(event) {
      console.log(event, event.target.value);
      let year= event.target.value;
      if (year==='*'){
        this.setState({
          filterYear: "*",
          filteredGraduates : [...graduates]
        })
      }else{
        this.setState({
        filterYear: year,
        filteredGraduates : graduates.filter( (graduate) => graduate.YearOf===year.toString() )
      })
      }
    }

    updateNameInput(event){
      console.log(event.target.value);
      let name = event.target.value;
      this.setState({
        filterName: name,
        filteredGraduates : graduates.filter( (graduate) => (graduate.Surname.startsWith(name)||graduate.Name.startsWith(name)) )
      })
    }

    updateLocation(event){
      console.log(event, event.target.value);
      let location = event.target.value;
      if (location==='*'){
        this.setState({
          filterLocation: "*",
          filteredGraduates : [...graduates]
        })
      }else{
        this.setState({
        filterLocation: location,
        filteredGraduates : graduates.filter( (graduate) => graduate.homeLocation===location )
      })
      }
    }

    updateJob(event){
      console.log(event, event.target.value);
      let job = event.target.value;
      if (job==='*'){
        this.setState({
          filterJob: "*",
          filteredGraduates : [...graduates]
        })
      }else{
        this.setState({
        filterJob: location,
        filteredGraduates : graduates.filter( (graduate) => graduate.job===job )
      })
      }
    }

    
    render() {

        return (
          <div className="app">
          <div className="filters">
            <div className="name-pagination">
              <span 
                onClick={ () => this.updateInitial('*')}
                className={'*'==this.state.filterInitial? 'active': ''}
                >Α - Ω
              </span>
              <hr/>
              {letters.map( (letter) => {
              return(
                  <span 
                  onClick={ () => this.updateInitial(letter)}
                  className={letter==this.state.filterInitial? 'active': ''}
                  >{letter}</span>
                )
               }
              )}
            </div>

            <div className="year-pagination">
            <select value={this.state.filterYear} onChange={this.updateYear}>                
              <option value="" disabled selected>ΕΤΟΣ ΑΠΟΦ/ΣΗΣ</option>
              <option value="*">ΟΛΑ</option>
              {dates.map( (year) => {
              return(
                  <option value={year.toString()} >{year}</option>
                )
               }
              )}
            </select>
            </div>

            <div className="name-search">
              <input value={this.state.filterName} onChange={this.updateNameInput} placeholder="ΟΝΟΜΑ Η ΕΠΙΘΕΤΟ" />
            </div>
            
            <div className="location-select">
            <select value={this.state.filterLocation} onChange={this.updateLocation} >                
              <option value="" disabled selected>ΠΟΛΗ</option>
              <option value="*">ΟΛΑ</option>
              <option value="ΙΩΑΝΝΙΝΑ">ΙΩΑΝΝΙΝΑ</option>
              <option value="ΑΘΗΝΑ">ΑΘΗΝΑ</option>
              {this.state.availableLocations
              .filter(location => ( (location!="ΑΘΗΝΑ" && location!="ΙΩΑΝΝΙΝΑ") ))
              .sort( (x,y) => x.localeCompare(y) )
              .map( (location) => {
              return(
                  <option value={location} >{location}</option>
                )
               }
              )}
            </select>
            </div>
            
            <div className="job-select">
            <select value={this.state.filterJob} onChange={this.updateJob} >                
              <option value="" disabled selected>ΕΠΑΓΓΕΛΜΑ</option>
              <option value="*">ΟΛΑ</option>
              {this.state.availableJobs
              .sort( (x,y) => x.localeCompare(y) )
              .map( (job) => {
              return(
                  <option value={job} >{job}</option>
                )
               }
              )}
            </select>
            </div>


          </div> 
          {this.state.loaderVisible && <Loader /> }  
          {!this.state.loaderVisible &&  <div className="graduates-wrapper">
            {this.state.filteredGraduates
            .sort( (x,y) => x.Surname.localeCompare(y.Surname) )
            .map( (graduate) => {
              return(
                <div>
                  <Allumni
                  key={graduate.id}
                  id={graduate.id}
                  name = {graduate.Name.toUpperCase()}
                  surName={graduate.Surname.toUpperCase()}
                  fatherName={graduate.Father}
                  yearOf = {graduate.YearOf}
                  studies = {graduate.Studies}
                  job = {graduate.job? graduate.job: '-'}
                  homeLocation = {graduate.homeLocation? graduate.homeLocation: '-'}
                  HomeAd = {graduate.HomeAd}
                  HomeTel = {graduate.HomeTel}
                  Mobile = {graduate.Mobile}
                  JobDescription = {graduate.JobDescription}
                  WorkCity = {graduate.workCity}
                  WorkAd = {graduate.WorkAd}
                  WorkTel = {graduate.WorkTel}
                  SpouseName = {graduate.SpouseName}
                  SpouseJob = {graduate.spouseJob}
                  />               
                </div>
              )
            })
            }
          </div>}
    
          </div>
        );
      }
  }

ReactDOM.render(
    <App/>,
    document.getElementById('zosimaia_App')
);
