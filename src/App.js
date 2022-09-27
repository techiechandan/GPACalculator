import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import * as XLSX from 'xlsx'
import Navbar from './components/Navbar.js';
import  image from  './image.png'

import downloadImage from './downloadIcon.png';
import UserGuide from './components/UserGuide.js';


function App() {
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMassage] = useState(null);
  const [exportFile, setExportFile] = useState(null);

  let ResultData = [];

  const readExcel = (file)=>{
    const promise = new Promise((resolve,reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e)=>{
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray,{type:'buffer'});
        const workSheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(workSheet , {
          raw : true,
          header : ['slNo','NameOfStudent','RollNo','sub1Marks','sub2Marks','sub3Marks','sub4Marks','sub5Marks','sub6Marks']
        });
        resolve(data);
      }
      fileReader.onerror = (error)=>{
        reject(error);
      }
    })

    promise.then((finnalData)=>{
      finnalData.forEach(function(a, index) {

        let std = {
          "slNo":null,
          "NameOfStudent":null,
          "RollNo":null,
          "sub1Marks":null,
          "sub1Grade":null,
          "sub2Marks":null,
          "sub2Grade":null,
          "sub3Marks":null,
          "sub3Grade":null,
          "sub4Marks":null,
          "sub4Grade":null,
          "sub5Marks":null,
          "sub5Grade":null,
          "sub6Marks":null,
          "sub6Grade":null,
          "sub1Pnt":null,
          "sub2Pnt":null,
          "sub3Pnt":null,
          "sub4Pnt":null,
          "sub5Pnt":null,
          "sub6Pnt":null,
          "TotalMarks":null,
          "TotalGPA":null,
        }


        if(index>0){
        
          std.slNo = a.slNo;
          std.NameOfStudent = a.NameOfStudent;
          std.RollNo = a.RollNo;
          std.sub1Marks = a.sub1Marks;
          std.sub2Marks = a.sub2Marks;
          std.sub3Marks = a.sub3Marks;
          std.sub4Marks = a.sub4Marks;
          std.sub5Marks = a.sub5Marks;
          std.sub6Marks = a.sub6Marks;

          std.TotalMarks = a.sub1Marks+a.sub2Marks+a.sub3Marks+a.sub4Marks+a.sub5Marks+a.sub6Marks;
          const sub = [a.sub1Marks, a.sub2Marks, a.sub3Marks, a.sub4Marks, a.sub5Marks, a.sub6Marks];
          let totalPnt = 0;
          console.log(sub[0]);
          let i;
          for( i=0; i<sub.length; i++) {
            let tempGrade = null;
            let tempPnt = null;
            if(sub[i]>=91 && sub[i]<=100){
              tempGrade = "A+";
            }
            else if(sub[i]>=83 && sub[i]<=90){
              tempGrade = "A";
            }
            else if(sub[i]>=75 && sub[i]<=82){
              tempGrade = "B+"
            }
            else if(sub[i]>=67 && sub[i]<=74){
              tempGrade = "B";
            }
            else if(sub[i]>=59 && sub[i]<=66){
              tempGrade = "C+";
            }
            else if(sub[i]>=51 && sub[i]<=58){
              tempGrade = "C";
            }
            else if(sub[i]>=43 && sub[i]<=50){
              tempGrade = "D+";
            }
            else if(sub[i]>=35 && sub[i]<=42){
              tempGrade = "D";
            }
            else if(sub[i]>=0 && sub[i]<=34){
              tempGrade = "F";
            }
            else{
              console.log("Invalid subject marks value while processing Grade!");
            }



            if(tempGrade === "A+"){
              tempPnt = 8;
            }
            else if(tempGrade === "A"){
              tempPnt = 7;
            }
            else if(tempGrade === "B+"){
              tempPnt = 6;
            }
            else if(tempGrade === "B"){
              tempPnt = 5;
            }
            else if(tempGrade === "C+"){
              tempPnt = 4;
            }
            else if(tempGrade === "C"){
              tempPnt = 3;
            }
            else if(tempGrade === "D+"){
              tempPnt = 2;
            }
            else if(tempGrade === "D"){
              tempPnt = 1;
            }
            else if(tempGrade === "F"){
              tempPnt = 0;
            }
            else{
              console.log("Invalid Grade value while processing Grade Point!");
            }

            switch(i){
              case 0:
                std.sub1Grade = tempGrade;
                std.sub1Pnt = tempPnt;
                break;
              case 1:
                std.sub2Grade = tempGrade;
                std.sub2Pnt = tempPnt;
                break;
              case 2: 
                std.sub3Grade = tempGrade;
                std.sub3Pnt = tempPnt;
                break;
              case 3:
                std.sub4Grade = tempGrade;
                std.sub4Pnt = tempPnt;
                break;
              case 4:
                std.sub5Grade = tempGrade;
                std.sub5Pnt = tempPnt;
                break;
              case 5:
                std.sub6Grade = tempGrade;
                std.sub6Pnt = tempPnt;
                break;
              default:
                console.log("Grade is out of range!");
            }
            totalPnt = totalPnt + tempPnt;
          }
          std.TotalGPA = Math.round(((totalPnt/6) + Number.EPSILON) * 100) / 100;
        }
        ResultData.push(std);
      })
      setExportFile(ResultData);
    })
  } 

  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handelinput = (e)=>{
    setExportFile(null);
    setExcelFile(null);
    const file = e.target.files[0];
    if(file){
      if(file && fileType.includes(file.type)){
        setExcelFile(file);
        setMassage(null);

      }else{
        setMassage("Please select a valid file!");
      }
    }else{
      setMassage('Please select a file!');
    }
  }


  const handelClick = ()=>{
    if(excelFile !== null){
      setMassage(null);
      readExcel(excelFile);
    }else{
      setMassage("Please select a file!");
    }
  }

  const handelDownload = ()=>{
    exportResult();
  }

  const exportResult = ()=>{
    if(exportFile !== null){
      let resutlWorkBook = XLSX.utils.book_new();
      let resultWorkSheet =  XLSX.utils.json_to_sheet(exportFile);
      XLSX.utils.book_append_sheet(resutlWorkBook, resultWorkSheet,"Sheet1");
      XLSX.writeFile(resutlWorkBook,"Result.xlsx");
      setExcelFile(null);
    }
  }

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/"  element={

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
                            <div className="p-5">
                            
                                <img src={downloadImage}  onClick={handelDownload} alt="" className="img-fluid" />
                            
                            </div>
                        </div>}
                    </div>
                    </div>
                </div>
            </div>
            }/>
            <Route path="/UserGuide"  element={<UserGuide />}/>
        </Routes>
      </BrowserRouter>
  );
}
export default App;

