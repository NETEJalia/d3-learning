/*
    STEPS:

    - filter by year
        -filter by rank
            - filter by gender
            - filter by degree
            - filter by race
            - get a total for the sizing

*/

$(document).ready(function () {
    var data = null,
        chosenYear,
        genderMatch = [],
        degreeMatch = [],
        raceMatch = [],
        filterMale,
        filterFemale,
        filterDegree,
        filterYear,
        year,
        faculty,
        shapeFill,
        shape,
        rank,
        arr,
        facultyArr = [],
        circleArr = [],
        diamondArr = [];

    async function getData() {
        data = await d3.json("data.json");
    };

    function yearSelector (datapoint, chosenYear) {
        if (chosenYear) {
            if (chosenYear === datapoint.academicYear) {
                jobSelector(datapoint, faculty);
            }
        } else {
        }
    }

    function jobSelector (datapoint, faculty, job) {
        faculty.forEach(function (job) {
            if (job.chair) {
                rank = 'chair';
                shape = 'circle';
                job.chair.forEach(function (degree) {
                    degreeSelector(degree, rank);
                })
            } else if (job.professor) {
                rank = 'professor';
                shape = 'diamond';
                job.professor.forEach(function (degree) {
                    degreeSelector(degree, rank);
                })
            }
        })
    }

    function degreeSelector (degree, rank) {
        if (rank === 'chair') {
            arr = circleArr;
        } else if (rank === 'professor') {
            arr = diamondArr;
        }

        if (degree.mdPHD) {
            degree.mdPHD.forEach(function (person) {
                arr.push(person);
            })
        } else if (degree.MD) {
            degree.MD.forEach(function(person) {
                arr.push(person);
            })
        } else if (degree.PHD) {
            degree.PHD.forEach(function (person) {
                arr.push(person);
            })
        }
    }

    getData().then(function () {
        // get list of years
        var academicYears = [],
            facultyRank,
            facultyRace,
            facultyFemale,
            facultyMale,
            facultyTotal;


        data.forEach(function (datapoint) {
            academicYears.push(datapoint.academicYear);
            year = datapoint.academicYear;
            faculty = datapoint.faculty;
            
            chosenYear = 1900;
            yearSelector(datapoint, chosenYear);
            // filterYear = 1920;;
            // if (filterYear === year) {
            //     yearSelector(item, year, faculty);
            // } else {
            //     // console.log(item);
            // }
            

            // filterYear = 1900;

            // yearSelector(year, faculty);

            // get shapes for each position
            // faculty.forEach(function (job) {
            //     if (job.chair) {
            //         rank = job.chair;
            //         rankRunner(rank, job);
            //     } else if (job.professor) {
            //         rank = job.professor;
            //         rankRunner(rank, job);
            //     };
            // })
        });

    });
});

//     function degreeCheck(rank, degree, filter) {
//         degreeMatch = [];
//         if (filter) {
//             if (degree.hasOwnProperty(filter)) {
//                 if (filter === 'MD') {
//                     degree.MD.forEach(function (person) {
//                     degreeMatch.push(person);      
//                 })} else if (filter === 'mdPHD') {
//                     degree.mdPHD.forEach(function (person) {
//                     degreeMatch.push(person);
//                 })} else if (filter === 'PHD') {
//                     degree.PHD.forEach(function (person) {
//                         degreeMatch.push(person);
//                 })}
//             };
//         // } else {
//         //     console.log(rank);
//         //     degree.forEach(function (subdegree) {
//         //         // no degree filter selected
//         //     if (subdegree.hasOwnProperty('MD')) {
//         //         // no gender selected
//         //         gender = subdegree.MD.forEach(function (person) {
//         //             if (!filterMale && !filterFemale) {
//         //                 degreeMatch.push(person);
//         //             }
//         //             // female selected
//         //             else if (filterFemale) {
//         //                 if (person.female) {
//         //                     degreeMatch.push(person);
//         //                 }
//         //             }
//         //             // male selected
//         //             else if (filterMale) {
//         //                 if (person.male) {
//         //                     degreeMatch.push(person);
//         //                 }
//         //             }
//         //         })
//         //     } else if (subdegree.hasOwnProperty('mdPHD')) {
//         //         gender = subdegree.mdPHD.forEach(function (person) {
//         //             if (!filterMale && !filterFemale) {
//         //                 degreeMatch.push(person);
//         //             }
//         //             // female selected
//         //             else if (filterFemale) {
//         //                 if (person.female) {
//         //                     degreeMatch.push(person);
//         //                 }
//         //             }
//         //             // male selected
//         //             else if (filterMale) {
//         //                 if (person.male) {
//         //                     degreeMatch.push(person);
//         //                 }
//         //             }
//         //         })
//         //     } else if (subdegree.hasOwnProperty('PHD')) {
//         //         gender = subdegree.PHD.forEach(function (person) {
//         //             if (!filterMale && !filterFemale) {
//         //                 degreeMatch.push(person);
//         //             }
//         //             // female selected
//         //             else if (filterFemale) {
//         //                 if (person.female) {
//         //                     degreeMatch.push(person);
//         //                 }
//         //             }
//         //             // male selected
//         //             else if (filterMale) {
//         //                 if (person.male) {
//         //                     degreeMatch.push(person);
//         //                 }
//         //             }
//         //         })
//         //     }});
//         }
//     };

//             // no degree filter selected
//             // if (degree.hasOwnProperty('MD')) {
//             //     // no gender selected
//             //     gender = degree.MD.forEach(function (person) {
//             //         if (!filterMale && !filterFemale) {
//             //             degreeMatch.push(person);
//             //         }
//             //         // female selected
//             //         else if (filterFemale) {
//             //             if (person.female) {
//             //                 degreeMatch.push(person);
//             //             }
//             //         }
//             //         // male selected
//             //         else if (filterMale) {
//             //             if (person.male) {
//             //                 degreeMatch.push(person);
//             //             }
//             //         }
//             //     })
//             // } else if (degree.hasOwnProperty('mdPHD')) {
//             //     gender = degree.mdPHD.forEach(function (person) {
//             //         if (!filterMale && !filterFemale) {
//             //             degreeMatch.push(person);
//             //         }
//             //         // female selected
//             //         else if (filterFemale) {
//             //             if (person.female) {
//             //                 degreeMatch.push(person);
//             //             }
//             //         }
//             //         // male selected
//             //         else if (filterMale) {
//             //             if (person.male) {
//             //                 degreeMatch.push(person);
//             //             }
//             //         }
//             //     })
//             // } else if (degree.hasOwnProperty('PHD')) {
//             //     gender = degree.PHD.forEach(function (person) {
//             //         if (!filterMale && !filterFemale) {
//             //             degreeMatch.push(person);
//             //         }
//             //         // female selected
//             //         else if (filterFemale) {
//             //             if (person.female) {
//             //                 degreeMatch.push(person);
//             //             }
//             //         }
//             //         // male selected
//             //         else if (filterMale) {
//             //             if (person.male) {
//             //                 degreeMatch.push(person);
//             //             }
//             //         }
//             //     })
//             // }


//     function genderCheck(degree) {
//         genderMatch = [];
//         if (degree.hasOwnProperty('MD')) {
//             // no gender selected
//             gender = degree.MD.forEach(function (person) {
//                 if (!filterMale && !filterFemale) {
//                     genderMatch.push(person);
//                 }
//                 // female selected
//                 else if (filterFemale) {
//                     if (person.female) {
//                         genderMatch.push(person);
//                     }
//                     // male selected
//                 } else if (filterMale) {
//                     if (person.male) {
//                         genderMatch.push(person);
//                     }
//                 }
//             })
//         } else if (degree.hasOwnProperty('mdPHD')) {
//             gender = degree.mdPHD.forEach(function (person) {
//                 if (!filterMale && !filterFemale) {
//                     genderMatch.push(person);
//                 }
//                 // female selected
//                 else if (filterFemale) {
//                     if (person.female) {
//                         genderMatch.push(person);
//                     }
//                 }
//                 // male selected
//                 else if (filterMale) {
//                     if (person.male) {
//                         genderMatch.push(person);
//                     }
//                 }
//             })
//         } else if (degree.hasOwnProperty('PHD')) {
//             gender = degree.PHD.forEach(function (person) {
//                 if (!filterMale && !filterFemale) {
//                     genderMatch.push(person);
//                 }
//                 // female selected
//                 else if (filterFemale) {
//                     if (person.female) {
//                         genderMatch.push(person);
//                     }
//                 }
//                 // male selected
//                 else if (filterMale) {
//                     if (person.male) {
//                         genderMatch.push(person);
//                     }
//                 }
//             })
//         }
//     }


//     function colorPicker(person) {
//         if (person.race === 'asian') {
//             shapeFill = '#f4831f ' + person.race;
//         } else if (person.race === 'black') {
//             shapeFill = '#f5cb05 ' + person.race;
//         } else if (person.race === 'islander') {
//             shapeFill = '#0f5689 ' + person.race;
//         } else if (person.race === 'white') {
//             shapeFill = '#df4a50 ' + person.race;
//         } else if (person.race === 'hispanic') {
//             shapeFill = '#b5d25d ' + person.race;
//         } else if (person.race === 'native') {
//             shapeFill = '#2f89cf ' + person.race;
//         }
//         return shapeFill;
//     }

//     function rankRunner(rank, job, faculty) {
//         if (rank) {
//             // console.log(job);
//             faculty.forEach(function (degree) {
//                 if (degree.chair) {
//                     shape = 'circle';
//                     // degreeCheck(degree);
//                     // console.log(degree.chair);
//                     // console.log(degree.chair, degreeMatch);
//                     // console.log(job.chair);
//                 } else if (job.professor) {
//                     shape = 'diamond';
//                     // degreeCheck(degree);
//                     // console.log(job, degreeMatch);
//                 }
    
//                 // degreeCheck(degree, filterDegree);
//                 // console.log(degreeMatch);
//                 // checking only MD - filtering
//                 filterDegree = 'MD';
//                 if (filterDegree) {
//                     // degreeCheck(degree, filterDegree);
//                 }
                
//                 if (degreeMatch.length > 0) {
//                     // console.log(filterDegree, degreeMatch);
//                 }
    
//                 // checking only mdPHD - filtering
//                 filterDegree = 'mdPHD';
//                 if (filterDegree) {
//                     degreeCheck(degree, filterDegree);
//                 }
    
//                 if (degreeMatch.length > 0) {
//                     // console.log(filterDegree, degreeMatch);
//                 }
    
//                 // checking only PHD
//                 filterDegree = 'PHD';
//                 if (filterDegree) {
//                     // degreeCheck(degree, filterDegree);
//                 }
    
//                 if (degreeMatch.length > 0) {
//                     // console.log(filterDegree, degreeMatch);
//                 }
    
//                 // filtering females only
//                 filterFemale = true;
//                 genderCheck(degree);
//                 // console.log(genderMatch);
    
//                 // filtering fills for shape based on degree filter
    
//                 // filtering fills for gender filter
//                 genderMatch.forEach(function (person) {
//                     colorPicker(person);
//                     // console.log(shapeFill);
//                 });
//             })
//         }
//     }

//     // filter by year
//     function yearSelector (item, year, faculty) {
//         if (year === filterYear) {
//             faculty.forEach(function (job) {
//                 if (job.chair) {
//                     rank = job.chair;
//                     rankRunner(rank, job, faculty);
//                     degree = [];
//                     rank.forEach(function (deg) {
//                         degree.push(deg);
//                     })
//                     console.log(year, rank);
                    
//                 } else if (job.professor) {
//                     rank = job.professor;
//                     rankRunner(rank, job, faculty);
//                     // console.log(shape);
//                 }
//             })
//         }
//     }

    
//     )
// });