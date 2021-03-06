import React from 'react';
import download from 'downloadjs';
import Webcam from 'react-webcam';

import UploadBox from '../components/UploadBox';
import Card from '../components/Card';
import Button from '../components/Button';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import { getElement } from '../config/config';

import { getStarterFiles, sendFile } from '../api/api';

import bg from '../assets/images/bg-gradient-2.png';
import phone from '../assets/images/iphone.png';
import arrow from '../assets/images/arrow2.png';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // components: ['SearchBar','h1', 'Image', 'Paragraph'],
      components: null,
      err: false,
      uploadedImage: null,
      loading: false,
    };
    this.getStarterFiles = this.getStarterFiles.bind(this);
    this.setUploadState = this.setUploadState.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  setUploadState(state, callback){
  	this.setState(state, callback);
  }

  async sendFile(){
   	if(!this.state.uploadedImage){
   		return;
   	}

    try {
    	this.setState({
    		loading: true,
    	});

      const res = await sendFile({
        file: this.state.uploadedImage
      });

      if(res.err) {
        throw new Error(res.err);
      }

      this.setState({
      	components: res.components,
      	loading: false,
      });

    } catch (e) {
      this.setState({
        err: e.message
      })
    }
  }

  setImage(image) {
  	this.setState({
  		uploadedImage: image,
  	})
  }

  setLoading(mode) {
  	loading: mode
  }


  async getStarterFiles() {
    if (!this.state.components) {
      return;
    }
    try {
      const res = await getStarterFiles({
        components: this.state.components
      });

      if (res.err) {
        throw new Error(res.err);
      }

      download(res.blob, 'your_genie_app.zip');
    } catch (e) {
      this.setState({
        err: e.message
      });
    }
  }

  resetState(){
  	this.setState({
  		components: null,
      err: false,
      uploadedImage: null,
      loading: false,
  	})
  }

  render() {
    const cardStyle = {
      position: 'relative',
      marginTop: '62px',
      width: '300px',
      height: '424px',
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: '2px 0 0 0'
    };

    const phoneStyles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
    };

    return (
      <div>
        <div className="page-container">
          <div className="page upload flex-center-inside">
            { this.state.loading &&
            <div className="loading">
              <div className="spinner">
                <div className="dot1" />
                <div className="dot2" />
              </div>
              <Heading headingLevel={2} content="Generating your mockup..." />
            </div>
          	}
            {!this.state.loading && this.state.components &&
            <div style={{ overflow: 'hidden', width: '90%' }}>
              <div className="components-container">
                <div className="mockup">
                  <Heading headingLevel={1} content="What you drew" />
                  <div className="image-container" >
                    <img alt="uploaded" src={this.state.uploadedImage} />
                  </div>
                </div>
                <div className="arrow">
                  <img alt="arrow" src={arrow} />
                </div>
                <div className="phone-container">
                  {/* <img className="phone" alt="phone" src={phone} />
                      <div style={cardStyle}> */}
                  <Card size="small" >
                    {this.state.components.map((component, index) => (
                      getElement(component, index)
                    ))}
                  </Card>
                  {/* </div> */}
                </div>
              </div>
            </div>
            }

            {!this.state.loading && !this.state.components &&
              <div className="upload-container">
                <div className="upload-heading">
                  <Heading headingLevel={1} content="Upload your image" />
                  <Paragraph text="Watch your ideas come to life." />
                </div>
                <div className="upload-dropzone">
                  <UploadBox className="upload-dropzone" setUploadState={this.setUploadState} sendFile={this.sendFile} label="Drag files to upload" />
                </div>
              </div>
            }
          </div>
          <div className="bg-container">
            <img alt="bg" src={bg} />
          </div>
        </div>
        {this.state.components &&
          <div className="page-container">
            <div className="page" style={phoneStyles}>
              <div style={{ flex: '7' }}>
                <h1>Your app on a phone.</h1>
                <div style={{ width: '70%' }}>
                  <h3 style={{
                    color: '#5D5869', margin: '50px 0 50px 0', lineHeight: '145%', fontSize: '21px',
                  }}
                  >We took your drawing, and generated this prototype.  Download the code for your react application below.
                  </h3>
                  <Button rounded ghost large color="secondary" label="Download" onClick={this.getStarterFiles} />
                  <Button rounded ghost large color="secondary" label="Start another project" onClick={this.resetState} />
                </div>
              </div>
              <div className="phone-container" style={{ flex: '4' }}>
                <img className="phone" alt="phone" src={phone} />
                <div style={cardStyle}>
                  <Card size="small" >
                    {this.state.components.map((component, index) => (
                      getElement(component, index)
                    ))}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Upload;
