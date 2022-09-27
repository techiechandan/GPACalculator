import React from 'react';
import Navbar from './Navbar'
import  image from  '../image.png'
// import {message,handelinput, handelClick, downloadImage, handelDownload,exportFile} from '../App.js';

const Home = ()=>{
    return (
        <div>
            <Navbar />
            <div className="container-fluid my-5">
                <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                    <img src={image} alt="" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-4">
                    <div className="my-3 px-5">
                        <h3>GPA Calculator</h3>
                        <p>
                        Pleas read the user-guide from the user-guide tab, in-order to know how to use this Application.
                        </p>
                        <p className="text-danger">{message}</p>
                        <input type="file" className="form-control my-4 " id="inputFile" onChange = {handelinput} />
                        <div className="text-center">
                        <button className="btn btn-success" onClick={handelClick}>Submit</button>
                        </div>
                    </div>
                    </div>
                    {exportFile &&<div className="col-12 col-md-4">
                        <div className="">
                        
                            <img src={downloadImage}  onClick={handelDownload} alt="" className="img-fluid" />
                        
                        </div>
                    </div>}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home;