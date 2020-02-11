import AccountCardDetailsOutlineIcon from 'mdi-react/AccountCardDetailsOutlineIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import AnimateHeight from 'react-animate-height';

class Allumni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height:0
        };
        this.updateHeight = this.updateHeight.bind(this)

    }

    componentWillReceiveProps(){
        this.setState({height:0})
    }

    updateHeight() {        
        this.setState({
            height: this.state.height === 0 ? 'auto' : 0,
        });
    };

    render() {

        const {
            name,
            surName,
            fatherName,
            yearOf,
            studies,
            job,
            homeLocation,
            HomeAd,
            HomeTel,
            Mobile,
            JobDescription,
            WorkAdCountry_ID,
            WorkCity,
            WorkAd,
            WorkTel,
            SpouseName,
            SpouseJob
        } = this.props

        return (
        <div className="allumni-wrapper">
            <div className="allumni-main-info">
                <span className="allumni-surname">{surName}</span><br/><span className="allumni-name">{name}</span>
            </div>
            <div className="allumni-extra">
                <span className="allumni-year">{yearOf}</span><br/>
                <span className="allumni-job">{job}</span> / <span className="allumni-home-city">{homeLocation}</span>
            </div>
            <div className="allumni-details">
            <AnimateHeight
                duration={ 500 }
                height={ this.state.height }
                >
                <p><span className="attribute-name">ΟΝΟΜΑ ΠΑΤΡΟΣ:</span> {fatherName}</p>
                <p><span className="attribute-name">ΣΠΟΥΔΕΣ:</span> {studies}</p>
                <p><span className="attribute-name">ΔΙΙΕΥΘΥΝΣΗ ΟΙΚΙΑΣ:</span> {HomeAd}</p>
                <p><span className="attribute-name">ΤΗΛ. ΟΙΚΙΑΣ:</span> {HomeTel}</p>
                <p><span className="attribute-name">KINHTO:</span> {Mobile}</p>
                <p><span className="attribute-name">ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΘΕΣΗ:</span> {JobDescription}</p>
                <p><span className="attribute-name">ΔΙΙΕΥΘΥΝΣΗ ΕΡΓΑΣΙΑΣ:</span> {WorkAd}</p>
                <p><span className="attribute-name">ΤΗΛ. ΕΡΓΑΣΙΑΣ:</span> {WorkTel}</p>
                <p><span className="attribute-name">ΟΝΟΜΑ ΣΥΖΥΓΟΥ:</span> {SpouseName}</p>
                <p><span className="attribute-name">ΕΠΑΓΓΕΛΜΑ ΣΥΖΥΓΟΥ:</span> {SpouseJob}</p>
                </AnimateHeight>
            </div>
            <div className="allumni-actions">
                <span className="height-toggle" onClick={this.updateHeight}><AccountCardDetailsOutlineIcon size={30}/>ΣΤΟΙΧΕΙΑ ΜΕΛΟΥΣ</span>
                <span className={'actions-toggle ' + (this.state.height >= 0 ? '' : 'rotated') } onClick={this.updateHeight}><ChevronDownIcon/></span>
            </div>
        </div>
        );
    }
  }

export default Allumni