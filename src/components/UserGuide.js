import React from 'react';
import Navbar from './Navbar'
import exampleImage1 from '../Example1.png';
import exampleImage2 from '../Example2.png';

const UserGuide = ()=>{
    return (
        <div>
            <Navbar />
            <div className="container-fluid my-5">
                <div className="container">
                    <h4 className="text-danger">GPA Calculator User-Guide:-</h4>
                    <ul className=" " type="disc" >
                        <li className="fs-4 mb-2 text-justify">Only the following <span className="text-danger">collumns</span> and <span className="text-danger">collumn's name</span>are allowed as shown in image.</li>
                        <li className="fs-4 mb-2 text-justify">The header(<span className="text-danger">Collumn's Name</span> ) should be at the first row!</li>
                    </ul>
                    <div className="p-4 my-2">
                        <img src={exampleImage1} alt="" className="img-fluid" />
                    </div>
                    <ul className=" " type="disc" >
                        <li className="fs-4 my-2">Space(" ") or other special characters are not allowed in between collumn name, as shown in image.</li>
                    </ul>
                    <div className="p-4 my-2 text-justify">
                        <img src={exampleImage2} alt="" className="img-fluid" />
                    </div>
                    <ul className=" " type="disc" >
                        <li className="fs-4 my-2">After the uploading row file, a <span className="text-danger">Download Icon</span> will be shown, click on it to download the results.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserGuide;