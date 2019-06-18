    $(document).ready(function () {
        var data = null,
            genderMatch = [],
            degreeMatch = [],
            raceMatch = [],
            filterMale,
            filterFemale,
            shapeFill,
            shape,
            rank;

        async function getData () {
            data = await d3.json("data.json",);
        };

        function degreeCheck (degree) {
            degreeMatch = [];
            if (degree.hasOwnProperty('MD')) {
                // no gender selected
                gender = degree.MD.forEach(function(person) {
                    if(!filterMale && !filterFemale) {
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
                gender = degree.mdPHD.forEach(function(person) {
                    if(!filterMale && !filterFemale) {
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
                gender = degree.PHD.forEach(function(person) {
                    if(!filterMale && !filterFemale) {
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

        function genderCheck (degree) {
            genderMatch = [];
            if (degree.hasOwnProperty('MD')) {
                // no gender selected
                gender = degree.MD.forEach(function(person) {
                    if(!filterMale && !filterFemale) {
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
                gender = degree.mdPHD.forEach(function(person) {
                    if(!filterMale && !filterFemale) {
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
                gender = degree.PHD.forEach(function(person) {
                    if(!filterMale && !filterFemale) {
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
        }}
        

        function colorPicker (person) {
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


        function shapePicker (degree) {
            if (degree.hasOwnProperty('mdPHD')) {
                console.log(degree.mdPHD);
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

            data.forEach(function(item) {
                academicYears.push(item.academicYear);

                var faculty = item.faculty;
                
                // get shapes for each position
                faculty.forEach(function (job) {
                    if (job.chair) {
                        rank = job.chair;
                        shape = 'circle';

                        rank.forEach(function(degree) {
                            degreeCheck(degree);
                            
                            // checking only mdPHD - filtering
                            if (degree.hasOwnProperty('mdPHD')) {
                                // console.log(degreeMatch);
                            };
                            
                            // filtering females only
                            filterFemale = true;
                            genderCheck(degree);
                            console.log(genderMatch);

                            // filtering fills for shape based on degree filter
                            degreeMatch.forEach(function (person) {
                                colorPicker(person);
                            });

                            // filtering fills for gender filter
                            genderMatch.forEach(function (person) {
                                colorPicker(person);
                                console.log(shapeFill);
                            });
                        })

                    } else if (job.professor) {
                        rank = job.professor;
                        shape = 'diamond';
                    };  
                })
            });

            // degree and gender checks for chairs
            data[0].faculty[0].chair.forEach(function(person) {
                degreeCheck(person);
                if (degreeMatch.length > 0) {
                    // console.log(degreeMatch);
                }

                // gender check
                genderCheck(person);
                if (genderMatch.length > 0) {
                    // console.log(genderMatch);
                }

                // raceCheck(person);
            });

            // degree and gender checks for professors
            // data[0].faculty[1].professor.forEach(function(person) {
            //     degreeCheck(person);
            //     if (degreeMatch.length > 0) {
            //         console.log(degreeMatch);
            //     }

            //     // gender check
            //     genderCheck(person);
            //     if (genderMatch.length > 0) {
            //         console.log(genderMatch);
            //     }
            // });

            }
        )
    });

    /*
    degreeMatch = [];
        if (degree.hasOwnProperty('MD')) {
            // no gender selected
            gender = degree.MD.forEach(function(person) {
                if(!filterMale && !filterFemale) {
                    console.log('no filters');
                    degreeMatch.push(person);
                }
                // female selected
                else if (filterFemale) {
                        if (person.female) {
                            console.log('female filters');
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
            gender = degree.MD.forEach(function(person) {
                if(!filterMale && !filterFemale) {
                    console.log('no filters');
                    degreeMatch.push(person);
                }
                // female selected
                else if (filterFemale) {
                        if (person.female) {
                            console.log('female filters');
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
            gender = degree.MD.forEach(function(person) {
                if(!filterMale && !filterFemale) {
                    console.log('no filters');
                    degreeMatch.push(person);
                }
                // female selected
                else if (filterFemale) {
                        if (person.female) {
                            console.log('female filters');
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
        */