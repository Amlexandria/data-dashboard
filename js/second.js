
/********ENCONTRANDO SEDE ********/
//FUNCION: "query-string PARA ACCEDER A LOS VALORES DE LA SEDE REQUERIDA
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
console.log(getParameterByName('sede'));

//OBTENER UN ARREGLO DE LA SEDE SELECCIONADA
var arraySede = data[getParameterByName('sede')];
console.log(arraySede);

/******COLOCANDO NOMBRE SEDE SELECCIONADA***/
if (getParameterByName('sede') === 'CDMX') {
    var getNameLocation = document.getElementById('name-location').innerHTML = 'CDMX, México';
} else if (getParameterByName('sede') === 'AQP') {
    var getNameLocation = document.getElementById('name-location').innerHTML = 'Arequipa, Perú';
} else if (getParameterByName('sede') === 'LIM') {
    var getNameLocation = document.getElementById('name-location').innerHTML = 'Lima, Perú ';
} else if (getParameterByName('sede') === 'SCL') {
    var getNameLocation = document.getElementById('name-location').innerHTML = 'Santiago de Chile, Chile';
};


/******** ENCONTRANDO GENERACIONES**********/
//OBTENER TOTAL DE GENERACIONES
var totalGeneration = Object.keys(arraySede);
console.log(totalGeneration);

//CREAR LOS OPTIONS(generaciones encontradas por sede)
var menuGeneration = document.getElementById('menu-generation');
for (var i = 0; i < totalGeneration.length; i++) {
    var eachGeneration = totalGeneration[i];

    //CREAR ELEMENTOS DE SELECTION
    var option = document.createElement('option');
    var textOption = document.createTextNode(eachGeneration);

    //CREAR ATRIBUTOS A ELEMENTOS-- al id y value se les va asignando el valor de I para poderlos manipular al seleccionar
    option.setAttribute('id', i);
    option.setAttribute('class', 'option');
    option.setAttribute('value', i);

    //INDICAR POSICION DE HERENCIA
    option.appendChild(textOption);
    menuGeneration.appendChild(option);
};


/***REQUERIMIENTO 1: FUNCIÓN QUE ARROJA EL TOTAL DE ESTUDIANTES POR SEDE*************/
var totalStudentsPerHeadQuarters = function (headQuarters) {
    var generationsOfHeadquarters = Object.keys(headQuarters);
    var sum = 0;
    for (var i = 0; i < generationsOfHeadquarters.length; i++) {
        var students = headQuarters[generationsOfHeadquarters[i]].students;
        //console.log(students);
        var totalStudentsperGeneration = Object.keys(students).length;
        //console.log(totalStudentsperGeneration);


        sum += totalStudentsperGeneration;


    }
    //CREANDO ELEMENTOS PARA PLASMAR EN HTML TOTAL DE ESTUDIANTES POR GENERACION
    var containStudents = document.getElementById('contain-total-sede');
    var totalStudents = document.getElementById('students-general');
    var textTotalStudents = document.createElement('p');
    var textTotal = document.createTextNode(sum);

    textTotalStudents.setAttribute('id', 'studentsPerLocation');
    textTotalStudents.setAttribute('class', 'studentsPerSede');

    textTotalStudents.appendChild(textTotal);
    totalStudents.appendChild(textTotalStudents);
    containStudents.appendChild(totalStudents);

    return sum;

};

console.log(totalStudentsPerHeadQuarters(arraySede));


/*******************TRABAJANDO CON SEDES********************************************/

//FUNCION QUE RETORNA UN ARRAY2D CON LAS ESTUDIANTES POR GENERACION DE CADA SEDE
var arrayOfStudentsPerHeadquarters = function (headquarters) {
    var generationsOfHeadquarters = Object.keys(headquarters);
    //  generationsOfHeadquarters = ["2017-1", "2017-2"]
    var studentsperGeneration = [];
    for (var i in generationsOfHeadquarters) {
        var students = headquarters[generationsOfHeadquarters[i]].students;
        studentsperGeneration.push(students);
    }

    return studentsperGeneration;
};

console.log(arrayOfStudentsPerHeadquarters(arraySede));


/************FUNCIÓN QUE RETORNA UN ARRAY CON LAS ESTUDIANTES ACTIVAS DE CADA SEDE**********************/
var arrayOfActiveStudentsPerHeadquarters = function (headquarters) {
    var generationsOfHeadquarters = Object.keys(headquarters);
    //  generationsOfHeadquarters = ["2017-1", "2017-2"]
    var studentsperGeneration = [];
    var activeStudents = [];
    var inactiveStudents = [];
    for (var i in generationsOfHeadquarters) {
        var students = headquarters[generationsOfHeadquarters[i]].students;
        students.forEach(function (obj, index) {
            var statusOfTheStudent = obj.active;
            if (statusOfTheStudent == true) {
                activeStudents.push(obj);

            }
        });
    }
    //CREANDO ELEMENTOS PARA PLASMAR EN HTML CANTIDAD DE ALUMNAS ACTIVAS
    var containStudents = document.getElementById('contain-total-sede');
    var totalActiveStudents = document.getElementById('students-actives');
    var textTotalActiveStudents = document.createElement('p');
    var textTotalActive = document.createTextNode(activeStudents.length);

    textTotalActiveStudents.setAttribute('id', 'studentsActivePerLocation');
    textTotalActiveStudents.setAttribute('class', 'studentsPerSede');

    textTotalActiveStudents.appendChild(textTotalActive);
    totalActiveStudents.appendChild(textTotalActiveStudents);
    containStudents.appendChild(totalActiveStudents);

    return activeStudents;
};

console.log(arrayOfActiveStudentsPerHeadquarters(arraySede));


/************FUNCIÓN QUE RETORNA UN ARRAY CON LAS ESTUDIANTES INACTIVAS DE CADA SEDE**********************/
var arrayOfInactiveStudentsPerHeadquarters = function (headquarters) {
    var generationsOfHeadquarters = Object.keys(headquarters);
    //  generationsOfHeadquarters = ["2017-1", "2017-2"]
    var studentsperGeneration = [];
    var activeStudents = [];
    var inactiveStudents = [];
    for (var i in generationsOfHeadquarters) {
        var students = headquarters[generationsOfHeadquarters[i]].students;
        students.forEach(function (obj, index) {
            var statusOfTheStudent = obj.active;
            if (statusOfTheStudent === false) {
                inactiveStudents.push(obj);
            }
        });
    }
    //CREANDO ELEMENTOS PARA PLASMARLOS EN HTML, LA CANTIDAD DE ALUMNAS INACTIVAS
    var containStudents = document.getElementById('contain-total-sede');
    var totalInactiveStudents = document.getElementById('students-inactives');
    var textTotalInactiveStudents = document.createElement('p');
    var textTotalInactive = document.createTextNode(inactiveStudents.length);

    textTotalInactiveStudents.setAttribute('id', 'studentsInactivePerLocation');
    textTotalInactiveStudents.setAttribute('class', 'studentsPerSede');

    textTotalInactiveStudents.appendChild(textTotalInactive);
    totalInactiveStudents.appendChild(textTotalInactiveStudents);
    containStudents.appendChild(totalInactiveStudents);

    return inactiveStudents;
};

console.log(arrayOfInactiveStudentsPerHeadquarters(arraySede));

/************FUNCIÓN QUE RETORNA UN ARRAY2D CON LAS ESTUDIANTES ACTIVAS E INACTIVAS POR SEDE**********************/
var statusOfTheStudentsPerHeadquarters = function (headquarters) {
    var generationsOfHeadquarters = Object.keys(headquarters);
    //  generationsOfHeadquarters = ["2017-1", "2017-2"]
    var studentsperHeadquarters = [];
    var activeStudents = [];
    var inactiveStudents = [];
    for (var i in generationsOfHeadquarters) {
        var students = headquarters[generationsOfHeadquarters[i]].students;
        students.forEach(function (obj, index) {
            var statusOfTheStudent = obj.active;
            console.log(statusOfTheStudent);

            if (statusOfTheStudent == true) {
                activeStudents.push(obj);
            } else {
                inactiveStudents.push(obj);
            }
        });

    }
    studentsperHeadquarters.push(activeStudents, inactiveStudents);
    activeStudents.unshift();
    inactiveStudents.unshift();

    return studentsperHeadquarters;
};

console.log(statusOfTheStudentsPerHeadquarters(arraySede));
var containStudents = document.getElementById('contain-total-sede');

/******REQUERIMIENTO 2: SE CREA FUNCION GENERAL DEPENDIENDO LA GENERACION SELECCIONADA *********/
function selectGeneration(value) {
    var list = document.getElementById('contain-menu').style.display = "block";

    var getGeneration = document.getElementById(value).textContent;
    console.log(getGeneration);

    //ENTRAR A LAS LLAVES DE LAS GENERACION SELECCIONADA
    var generations = Object.keys(arraySede);

    // //INICIALIZANDO CONTADORES PARA ESTUDIANTES ACTIVAS E INACTIVAS
    var active = 0;
    var inactive = 0;

    // GUARDANDO  ESTUDIANTES EN ARRAY SEGUN SU STATUS
    var studentsperHeadquarters = [];
    var activeStudents = [];
    var inactiveStudents = [];

    // //ENTRAR A CADA GENERACION POR SEDE
    for (var i = 0; i < generations.length; i++) {
        if (generations[i] == getGeneration) {
            var students = arraySede[generations[i]].students;
            var ratings = arraySede[generations[i]].ratings;


            //ENTRAR A LAS ESTUDIANTES POR GENERACION
            for (var j = 0; j < students.length; j++) {
                var studentsStatus = students[j].active;

                //SI LA ESTUDIANTE ESTA ACTIVA O INACTIVA
                if (studentsStatus == true) {
                    active = active + 1;
                    activeStudents.push(students[j]);


                } else if (studentsStatus == false) {
                    inactive = inactive + 1;
                    inactiveStudents.push(students[j]);
                };
            };//cierra for en j


            //HACIENDO UN ARRAY CON LOS NOMBRES DE LAS ESTUDIANTES ACTIVAS
            var arrNamesOfActiveStudents = [];
            for (obj of activeStudents){
                var nameOfActiveStudent = obj.name;
                arrNamesOfActiveStudents.push(nameOfActiveStudent);
            };

            //HACIENDO UN ARRAY CON LOS NOMBRES DE LAS ESTUDIANTES INACTIVAS
            var arrNamesOfInactiveStudents = [];
            for (obj of inactiveStudents){
                var nameOfInactiveStudent = obj.name;
                arrNamesOfInactiveStudents.push(nameOfInactiveStudent);
                console.log(arrNamesOfInactiveStudents);
            }




            /******REQUERIMIENTO 3: CANTIDAD Y PORCENTAJE DE ESTUDIANTES EXITOSAS POR GENERACION *********/
            var arrOfSuccessfulStudentsPerGeneration = [];
            var arrOfSuccessfulStudentsPerGenerationTech = [];
            var arrOfSuccessfulStudentsPerGenerationHse = [];

            for (element of activeStudents) {
                //console.log(element);
                var sprints = element.sprints;
                //console.log(sprints);
                var seventyPercent = 3000 * sprints.length * .7;
                var seventyPercentTech = 1800 * sprints.length * .7;
                var seventyPercentHse = 1200 * sprints.length * .7;
                console.log(seventyPercent);

                var sumScoreTechAllSprints = 0;
                var sumScoreHseAllSprints = 0;
                var sumScoreOfAllSprints = 0;

                for (obj of sprints) {
                    var score = obj.score;
                    console.log(score);
                    var tech = score.tech;
                    console.log(tech);
                    var hse = score.hse;
                    console.log(hse);
                    sumScoreTechAllSprints += tech;
                    console.log(sumScoreTechAllSprints);
                    sumScoreHseAllSprints += hse;
                    console.log(sumScoreHseAllSprints);
                    var scorePerSprint = tech + hse;
                    sumScoreOfAllSprints += scorePerSprint;
                    console.log(sumScoreOfAllSprints);
                    if (sumScoreOfAllSprints > seventyPercent) {
                        arrOfSuccessfulStudentsPerGeneration.push(element);
                        //console.log(arrOfSuccessfulStudentsPerGeneration);
                    };//cierra if
                    if (sumScoreTechAllSprints > seventyPercentTech) {
                        arrOfSuccessfulStudentsPerGenerationTech.push(element);
                        //console.log(arrOfSuccessfulStudentsPerGenerationTech);
                    };
                    if (sumScoreHseAllSprints > seventyPercentHse) {
                        arrOfSuccessfulStudentsPerGenerationHse.push(element);
                    }
                };//cierra for of sprints
            };//cierra for of activeStudents
            var boxStudents = document.getElementById('box-students');
                var boxSuccesfulStudents= document.getElementById('box-succesful-students');
                var succesfulStudents = document.getElementById('succesful-students');
                var totalNameStudents = document.createElement('p');
                var textNames = document.createTextNode(arrOfSuccessfulStudentsPerGeneration.length);

                // totalActive.appendChild(textActive.name);
                totalNameStudents.appendChild(textNames );
                succesfulStudents.appendChild(totalNameStudents);
                boxSuccesfulStudents.appendChild(succesfulStudents);
                boxStudents.appendChild(boxSuccesfulStudents);

            //CANTIDAD DE ESTUDIANTES EXITOSAS
            var numberOfSuccessfulStudentsPerGeneration = arrOfSuccessfulStudentsPerGeneration.length;
            // console.log(numberOfSuccessfulStudentsPerGeneration);

            //PORCENTAJE DE ESTUDIANTES EXITOSAS
            var percentageOfSuccessfulStudentsPerGeneration = numberOfSuccessfulStudentsPerGeneration/activeStudents.length*100;
                console.log(percentageOfSuccessfulStudentsPerGeneration);

            //CANTIDAD DE ESTUDIANTES EXITOSAS TECH
            var numberOfSuccessfulStudentsTech = arrOfSuccessfulStudentsPerGenerationTech.length;
            //PORCENTAJE
            var percentageSuccesfulStudentsTech = numberOfSuccessfulStudentsTech/activeStudents.length*100;

            //CANTIDAD DE ESTUDIANTES EXITOSAS HSE
            var numberOfSuccessfulStudentsHse = arrOfSuccessfulStudentsPerGenerationHse.length;
            //PORCENTAJE
            var percentageSuccesfulStudentsHse = numberOfSuccessfulStudentsHse/activeStudents.length*100;



                //CREANDO ELEMENTOS PARA MOSTRAR EN HTML  % ALUMNAS SATISFECHAS
                var boxStudents3 = document.getElementById('box-students')
                var boxSuccesfulStudents= document.getElementById('box-succesful-students');
                var succesfulStudents= document.getElementById('succesful-students');
                var percentageSuccesful= document.getElementById('percentage-succesful');
                var textPercentage = document.createTextNode(percentageOfSuccessfulStudentsPerGeneration.toFixed(2) + "%");

                percentageSuccesful.appendChild(textPercentage);
                succesfulStudents.appendChild(percentageSuccesful);
                boxSuccesfulStudents.appendChild(succesfulStudents);
                boxStudents3.appendChild(boxSuccesfulStudents);

            //CREANDO ELEMENTOS PARA QUE EN HMTL SE MUESTRE EL NOMBRE DE ESTUDIANTES ACTIVAS
            var percentageOfSuccessfulStudentsPerGeneration = numberOfSuccessfulStudentsPerGeneration;

            var boxStudents = document.getElementById('box-students');
            var boxNameStudents = document.getElementById('box-name-actives-students');
            var nameStudents = document.getElementById('active-name-students');
            var totalNameStudents = document.createElement('p');
            var textNames = document.createTextNode(arrNamesOfActiveStudents);

            totalNameStudents.appendChild(textNames);
            nameStudents.appendChild(totalNameStudents);
            boxNameStudents.appendChild(nameStudents);
            boxStudents.appendChild(boxNameStudents);

            /************************TRABAJANDO CON RATINGS*************************/
            /******REQUERIMIENTO 4: OBTENIENDO EL % DE ESTUDIANTES SATISFECHA POR GENERACION *********/

            //Obteniendo la suma de todos los porcentajes de los sprints por generación
            var sum = 0;
            for (element of ratings) {
                console.log(element);
                var students = element.student;
                console.log(students);
                var cumple = students["cumple"];
                console.log(cumple);
                var supera = students.supera;
                console.log(supera);
                var sumCumpleSupera = cumple + supera;
                sum += sumCumpleSupera;
                console.log(sum);
            };

            //OBTENIENDO EL PORCENTAJE TOTAL DE ESTUDIANTES SATISFECHAS POR GENERACIONES
            var percentageOfStudentsSatisfiedPerGeneration = ((sum / ratings.length).toFixed(2) + "%");

            var boxStudents = document.getElementById('box-students');
            var satisficedStudents = document.getElementById('satisfied-students');
            var studentsSatisfied = document.getElementById('text-satisfied-students');
            var totalSatisfied = document.createElement('p');
            var textSatisfied = document.createTextNode(percentageOfStudentsSatisfiedPerGeneration);

            totalSatisfied.appendChild(textSatisfied);
            studentsSatisfied.appendChild(totalSatisfied);
            satisficedStudents.appendChild(studentsSatisfied);
            boxStudents.appendChild(satisficedStudents);


            /******REQUERIMIENTO 5: PUNTUACIÓN PROMEDIO DE L@S PROFESORES POR GENERACION*********/

            var sumOfTheAverage = 0;
            for (element of ratings) {
                var averageOfTeachersPerSprint = element.teacher;
                sumOfTheAverage += averageOfTeachersPerSprint;
            };

            //OBTENIENDO EL PROMEDIO DE PROFESORES POR GENERACION
            var averageOfTeachersPerGeneration = sumOfTheAverage / ratings.length;
            console.log(averageOfTeachersPerGeneration.toFixed(2));

            var boxCoaches = document.getElementById('box-coaches');
            var gradesCoaches = document.getElementById('grades-coaches');
            var textGradesCoaches = document.getElementById('text-grades-coaches');
            var total = document.createElement('p');
            var textGrades = document.createTextNode(averageOfTeachersPerGeneration.toFixed(2));

            total.appendChild(textGrades);
            textGradesCoaches.appendChild(total);
            gradesCoaches.appendChild(textGradesCoaches);
            boxCoaches.appendChild(gradesCoaches);

            /******REQUERIMIENTO 6: PUNTUACIÓN PROMEDIO DE L@S JEDIE MASTER POR GENERACION*********/

            var sumOfTheAverage2 = 0;
            for (element of ratings) {
                var averageOfJediPerSprint = element.jedi;
                sumOfTheAverage2 += averageOfJediPerSprint;
            };

            //OBTENIENDO EL PROMEDIO DE JEDIE POR GENERACION
            var averageOfJediPerGeneration = sumOfTheAverage2 / ratings.length;
            console.log(averageOfJediPerGeneration.toFixed(2));

            var boxJedis = document.getElementById('box-jedis');
            var gradesJedis = document.getElementById('grades-jedis');
            var totalGradesJedis = document.getElementById('text-grades-jedis');
            var totalGrades = document.createElement('p');
            var textJedis = document.createTextNode(averageOfJediPerGeneration.toFixed(2));

            totalGrades.appendChild(textJedis);
            totalGradesJedis.appendChild(totalGrades);
            gradesJedis.appendChild(totalGradesJedis);
            boxJedis.appendChild(gradesJedis);

        };//cierra if
    };//cierra el for en i
    var boxStudents1 = document.getElementById('box-students');
    var activeStudents = document.getElementById('active-students');
    var textActiveStudents = document.getElementById('text-active-students');
    var totalActive = document.createElement('p');
    var textActiveCont = document.createTextNode(active);

    // totalActive.appendChild(textActive.name);
    totalActive.appendChild(textActiveCont);
    textActiveStudents.appendChild(totalActive);
    activeStudents.appendChild(textActiveStudents);
    boxStudents1.appendChild(activeStudents);

/****************/
    var boxStudents2 = document.getElementById('box-students');
    var inactiveStudents = document.getElementById('inactive-students');
    var textInactiveStudents = document.getElementById('text-inactive-students');
    var totalInactive = document.createElement('p');
    var textInactiveCont = document.createTextNode(inactive);

    // totalActive.appendChild(textActive.name);
    totalInactive.appendChild(textInactiveCont);
    textInactiveStudents.appendChild(totalInactive);
    inactiveStudents.appendChild(textInactiveStudents);
    boxStudents2.appendChild(inactiveStudents);


    return (active, activeStudents, inactive, inactiveStudents, percentageOfStudentsSatisfiedPerGeneration, averageOfTeachersPerGeneration, averageOfJediPerGeneration);
};
