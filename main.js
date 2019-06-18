$(document).ready(function () {
    var data = null,
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
        rank;

    async function getData() {
        data = await d3.json("data.json");
    };

    function degreeCheck(degree, filter) {
        degreeMatch = [];

        if (filter) {
            if (degree.hasOwnProperty(filter)) {
                if (filter === 'MD') {
                    degree.MD.forEach(function (person) {
                    degreeMatch.push(person);      
                })} else if (filter === 'mdPHD') {
                    degree.mdPHD.forEach(function (person) {
                    degreeMatch.push(person);
                })} else if (filter === 'PHD') {
                    degree.PHD.forEach(function (person) {
                        degreeMatch.push(person);
                })}
            };
        } else {
            // no degree filter selected
            if (degree.hasOwnProperty('MD')) {
                // no gender selected
                gender = degree.MD.forEach(function (person) {
                    if (!filterMale && !filterFemale) {
                        degreeMatch.push(person);
                    }
                    // female selected
                    else if (filterFemale) {
                        if (person.female) {
                            degreeMatch.push(person);
                        }
                    }
                    // male selected
                    else if (filterMale) {
                        if (person.male) {
                            degreeMatch.push(person);
                        }
                    }
                })
            } else if (degree.hasOwnProperty('mdPHD')) {
                gender = degree.mdPHD.forEach(function (person) {
                    if (!filterMale && !filterFemale) {
                        degreeMatch.push(person);
                    }
                    // female selected
                    else if (filterFemale) {
                        if (person.female) {
                            degreeMatch.push(person);
                        }
                    }
                    // male selected
                    else if (filterMale) {
                        if (person.male) {
                            degreeMatch.push(person);
                        }
                    }
                })
            } else if (degree.hasOwnProperty('PHD')) {
                gender = degree.PHD.forEach(function (person) {
                    if (!filterMale && !filterFemale) {
                        degreeMatch.push(person);
                    }
                    // female selected
                    else if (filterFemale) {
                        if (person.female) {
                            degreeMatch.push(person);
                        }
                    }
                    // male selected
                    else if (filterMale) {
                        if (person.male) {
                            degreeMatch.push(person);
                        }
                    }
                })
            }
        }


    }

    function genderCheck(degree) {
        genderMatch = [];
        if (degree.hasOwnProperty('MD')) {
            // no gender selected
            gender = degree.MD.forEach(function (person) {
                if (!filterMale && !filterFemale) {
                    genderMatch.push(person);
                }
                // female selected
                else if (filterFemale) {
                    if (person.female) {
                        genderMatch.push(person);
                    }
                    // male selected
                } else if (filterMale) {
                    if (person.male) {
                        genderMatch.push(person);
                    }
                }
            })
        } else if (degree.hasOwnProperty('mdPHD')) {
            gender = degree.mdPHD.forEach(function (person) {
                if (!filterMale && !filterFemale) {
                    genderMatch.push(person);
                }
                // female selected
                else if (filterFemale) {
                    if (person.female) {
                        genderMatch.push(person);
                    }
                }
                // male selected
                else if (filterMale) {
                    if (person.male) {
                        genderMatch.push(person);
                    }
                }
            })
        } else if (degree.hasOwnProperty('PHD')) {
            gender = degree.PHD.forEach(function (person) {
                if (!filterMale && !filterFemale) {
                    genderMatch.push(person);
                }
                // female selected
                else if (filterFemale) {
                    if (person.female) {
                        genderMatch.push(person);
                    }
                }
                // male selected
                else if (filterMale) {
                    if (person.male) {
                        genderMatch.push(person);
                    }
                }
            })
        }
    }


    function colorPicker(person) {
        if (person.race === 'asian') {
            shapeFill = '#f4831f ' + person.race;
        } else if (person.race === 'black') {
            shapeFill = '#f5cb05 ' + person.race;
        } else if (person.race === 'islander') {
            shapeFill = '#0f5689 ' + person.race;
        } else if (person.race === 'white') {
            shapeFill = '#df4a50 ' + person.race;
        } else if (person.race === 'hispanic') {
            shapeFill = '#b5d25d ' + person.race;
        } else if (person.race === 'native') {
            shapeFill = '#2f89cf ' + person.race;
        }
        return shapeFill;
    }


    function shapePicker(degree) {
        if (degree.hasOwnProperty('mdPHD')) {
            // console.log(degree.mdPHD);
        }
    }

    function rankRunner(rank, job) {
        rank.forEach(function (degree) {
            if (job.chair) {
                shape = 'circle';
            } else if (job.professor) {
                shape = 'diamond';
            }

            // checking only MD - filtering
            filterDegree = 'MD';
            if (filterDegree) {
                degreeCheck(degree, filterDegree);
                if (degreeMatch.length > 0) {
                    console.log(filterDegree, degreeMatch);
                }
            }

            // checking only mdPHD - filtering
            filterDegree = 'mdPHD';
            if (filterDegree) {
                degreeCheck(degree, filterDegree);
                if (degreeMatch.length > 0) {
                    console.log(filterDegree, degreeMatch);
                }
            }

            // checking only PHD
            filterDegree = 'PHD';
            if (filterDegree) {
                degreeCheck(degree, filterDegree);
                if (degreeMatch.length > 0) {
                    console.log(filterDegree, degreeMatch);
                }
            }


            // filtering females only
            filterFemale = true;
            genderCheck(degree);
            console.log(genderMatch);

            // filtering fills for shape based on degree filter

            // filtering fills for gender filter
            genderMatch.forEach(function (person) {
                colorPicker(person);
                console.log(shapeFill);
            });
        })
    }

    // filter by year
    function yearSelector (item, year, faculty, degree) {
        if (year === filterYear) {
            faculty.forEach(function (job) {
                if (job.chair) {
                    rank = job.chair;
                    rankRunner(rank, job);
                } else if (job.professor) {
                    rank = job.professor;
                    rankRunner(rank.job);
                }
            })
        } else {
            console.log(year, filterYear)
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


        data.forEach(function (item) {
            academicYears.push(item.academicYear);
            year = item.academicYear;
            faculty = item.faculty;
            
            filterYear = 1920;
            if (filterYear) {
                yearSelector(item, year, faculty);
            } else {
                console.log(item);
            }
            

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

    }
    )
});