/*
* Copyright 2017, Pablo Andueza pabloandumundu@gmail.com

* This file is part of Tagstoo.

* Tagstoo is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.

* Tagstoo is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with Tagstoo.  If not, see <http://www.gnu.org/licenses/>.
*/



var fs=require('fs-extra');
var Sniffr = require("sniffr");
var agent = navigator.userAgent;
window.s = "";
s = new Sniffr();
s.sniff(agent);
console.log(s.os.name);


window.listadofiltradodeDB = []

$(document).ready(function() {

  //unos estilos personalizados para linux y macos
  if (s.os.name == "linux") {
    $('#initalselect').css("margin","0 auto 49px auto");
    $('#initalhelp').css("bottom","65px");
    $('#colorswitch_initial').css("bottom","57px");
  }
  if (s.os.name == "macos") {
    $('#initalselect').css("margin","0 auto 32px auto");
    $('#initalhelp').css("bottom","47px");
    $('#colorswitch_initial').css("bottom","38px");
  }


  if (!localStorage["language"]) { 

    language = "EN";
    localStorage["language"] = "EN";

  } else {

    language = localStorage["language"];
    $("#languageselect").val(language);
  }


  $("#languageselect").on('change', function() {

    localStorage["language"] = this.value;
    language = this.value

    if (language == 'EN') {
      $(".lang_en").css("display", "inline-block");
      $(".lang_es").css("display", "none");
      $(".lang_fr").css("display", "none");
    } else if (language =='ES') {
      $(".lang_en").css("display", "none");
      $(".lang_es").css("display", "inline-block");
      $(".lang_fr").css("display", "none");
    } else if (language == "FR") {
      $(".lang_en").css("display", "none");
      $(".lang_es").css("display", "none");
      $(".lang_fr").css("display", "inline-block");
    }

  });


  if (language == 'EN') {
    $(".lang_en").css("display", "inline-block");
    $(".lang_es").css("display", "none");
    $(".lang_fr").css("display", "none");
  } else if (language =='ES') {
    $(".lang_en").css("display", "none");
    $(".lang_es").css("display", "inline-block");
    $(".lang_fr").css("display", "none");
  } else if (language == "FR") {
    $(".lang_en").css("display", "none");
    $(".lang_es").css("display", "none");
    $(".lang_fr").css("display", "inline-block");
  }
  
  // frases segun idioma

  if (language == 'EN') {

    ph_cantloaddrive = "(Can't load this drive, select another)";
    ph_localdisk = "local disk";
    ph_exterdisk = "external disk";
    ph_alr_01or02a = "There is no database previously used. You must enter a new name for a new database";
    ph_alr_02b = ", or select one from the available (previously created) database list.";
    ph_alr_03 = `Although the program was used previously databases list is empty, this can be due to one of these two cases:<br>

                - The program was updated and the old version was later reused, in this case the only solution is to create a new database and import your last backup into it. As is mentioned in the <a href='popups/popup-info-help_en.html#importantnote' target="_blank">help</a> that is why is important to maintain backup files updated. <br>

                - If before this version you have used version 1.4 or previous of Tagstoo <br>and databases don´t appear in the list, don´t worry, please <em><a href='popups/popup-info-help-retrocomp.html' target="_blank">read this</a></em>`;
    ph_alr_04 = "The name you chosen already exists, first delete the database that uses this name if you want to use it.";
    ph_alr_05 = "You must enter a name for the database first.";
    ph_alr_06 = "An open file dialogue will open, select the file where database is saved, be careful, data in the selected database will be overwritten by the content of the file.";
    ph_alr_07 = "Data successfully imported.";
    ph_alr_08a = "It appears that <em>'";
    ph_alr_08b = "'</em> do not have a valid data format, please select a valid data file.";
    ph_alr_09 = "First you must select a database to which import.";
    ph_alr_10 = "Database deleted successfully.";
    ph_alr_11 = "First you must select the database to delete.";
    ph_alr_12 = "Please select an available drive.";
    ph_alr_13 = "You must select an existing database or enter a new name for a new database to launch the program.";
    ph_alc_01a = "Attention, the data in selected database, <em>'";
    ph_alc_01b = "'</em>, will be overwritten by the content of file <em>'";
    ph_alc_01c = "'</em>, are you sure?";
    ph_alc_02a = "Attention, you have selected to delete <em>'";
    ph_alc_02b = "'</em>, are you sure?";

  } else if (language =='ES') {

    ph_cantloaddrive = "(No se puede cargar esta unidad, seleccione otra)";
    ph_localdisk = "disco local"
    ph_exterdisk = "disco externo";
    ph_alr_01or02a = "Ninguna base de datos utilizada anteriormente. Debe introducir un nuevo nombre para una nueva base de datos";
    ph_alr_02b = ", o seleccionar uno de la lista de bases de datos disponibles (previamente creadas).";
    ph_alr_03 = `Aunque el programa se utilizó anteriormente, la lista de bases de datos está vacía, esto puede deberse a uno de estos dos casos:<br>

                - Se actualizó el programa y posteriormente se volvió a utilizar la versión anterior, en este caso la única solución es crear una nueva base de datos e importar su última copia de seguridad en ella. Como se menciona en la <a href='popups/popup-info-help_es.html#importantnote' target="_blank">ayuda</a> por eso es importante mantener actualizados los archivos de copia de seguridad. <br>

                - Si antes de esta versión se ha utilizado la versión 1.4 o anterior de Tagstoo <br>y las bases de datos no aparecen en la lista, no se preocupe, por favor <em><a href='popups/popup-info-help-retrocomp.html' target="_blank">lea esto</a></em>`;
    ph_alr_04 = "El nombre que ha elegido ya existe, elimine primero la base de datos que utiliza este nombre si desea utilizarlo.";
    ph_alr_05 = "Debe introducir primero un nombre para la base de datos.";
    ph_alr_06 = "Se abrirá un cuadro de diálogo de abrir archivo, seleccione el archivo donde se guardó la base de datos, tenga cuidado, los datos de la base de datos seleccionada serán sobrescritos por el contenido del archivo.";
    ph_alr_07 = "Datos importados correctamente.";
    ph_alr_08a = "Parece que <em>'";
    ph_alr_08b = "'</em> no tiene un formato de datos válido, seleccione un archivo de datos válido.";
    ph_alr_09 = "Primero debe seleccionar una base de datos a la que importar.";
    ph_alr_10 = "Base de datos eliminada correctamente.";
    ph_alr_11 = "Primero debe seleccionar la base de datos a eliminar.";
    ph_alr_12 = "Por favor seleccione una unidad disponible.";
    ph_alr_13 = "Debe seleccionar una base de datos existente o introducir un nombre nuevo para una nueva base de datos para iniciar el programa.";
    ph_alc_01a = "Atención, los datos en la base de datos seleccionada, <em>'";
    ph_alc_01b = "'</em>,  serán sobrescritos por el contenido del archivo <em>'";
    ph_alc_01c = "'</em>, ¿está seguro?";
    ph_alc_02a = "Atención, ha seleccionado eliminar <em>'";
    ph_alc_02b = "'</em>, ¿está seguro?";

  } else if (language =='FR') {

    ph_cantloaddrive = "(Cet appareil ne peut pas être chargé, sélectionnez un autre)";
    ph_localdisk = "disque local";
    ph_exterdisk = "disque externe";
    ph_alr_01or02a = "Aucune base de données utilisée précédemment. Vous devez entrer un nouveau nom pour une nouvelle base de données";
    ph_alr_02b = ", ou choisissez-en un parmi la liste des bases de données disponibles (précédemment créées).";
    ph_alr_03 = `Bien que le programme ait été utilisé précédemment, la liste des bases de données est vide, cela peut être dû à l'un de ces deux cas:<br>

                - Le programme a été mis à jour et l'ancienne version a été réutilisée plus tard, dans ce cas, la seule solution est de créer une nouvelle base de données et d'importer votre dernière sauvegarde dans celle-ci. Comme mentionné dans <a href='popups/popup-info-help_fr.html#importantnote' target="_blank">l'aide</a> c'est pourquoi il est important de garder vos fichiers de sauvegarde à jour. <br>

                - Si avant cette version a été utilisée la version 1.4 ou antérieure de Tagstoo <br>et les bases de données n'apparaissent pas dans la liste, ne vous inquiétez pas, <em><a href='popups/popup-info-help-retrocomp.html' target="_blank">lisez ceci</a></em>`;
    ph_alr_04 = "Le nom que vous avez choisi existe déjà, commencez par supprimer la base de données qui utilise ce nom si vous souhaitez l'utiliser."
    ph_alr_05 = "Vous devez d'abord entrer un nom pour la base de données.";
    ph_alr_06 = "Une boîte de dialogue de ouvrir fichier sera ouverte, sélectionnez le fichier où la base de données est enregistrée, faites attention, les données dans la base de données sélectionnée seront écrasées par le contenu du fichier.";
    ph_alr_07 = "Données importées avec succès.";
    ph_alr_08a = "Il semble que <em>'";
    ph_alr_08b = "'</em> n'ont pas de format de données valide, sélectionnez un fichier de données valide.";
    ph_alr_09 = "D'abord vous devez sélectionner une base de données à laquelle importer.";
    ph_alr_10 = "Base de données supprimée avec succès.";
    ph_alr_11 = "Vous devez d'abord sélectionner la base de données à supprimer.";
    ph_alr_12 = "S'il vous plaît sélectionner un lecteur disponible.";
    ph_alr_13 = "Vous devez sélectionner une base de données existante ou entrer un nouveau nom pour une nouvelle base de données pour lancer le programme.";
    ph_alc_01a = "Attention, les données dans la base de données sélectionnée, <em>'";
    ph_alc_01b = "'</em>, seront écrasé par le contenu du fichier <em>'";
    ph_alc_01c = "'</em>, êtes-vous sûr?";
    ph_alc_02a = "Attention, vous avez choisi de supprimer <em>'";
    ph_alc_02b = "'</em>, êtes-vous sûr?";

  }


  // si no existe unidad utilizada por última vez, se selecciona la primera disponible
  if (!localStorage["lastuseddriveunit"]) {

  	var availabledrives=[];
  	var toselectfromdrives=[];

  	if (s.os.name == "windows") {

  		var drivelist = require('drivelist');

  		var t="";
  		var tdesc="";

  		availabledrives = drivelist.list((error, drives) => {

  			if (error) {
  				throw error;
  			}
  			drives.forEach((drive, i) => {

  				toselectfromdrives.push(drive.mountpoints["0"].path)

  			});

  			window.driveunit = toselectfromdrives["0"];

  			$('#selecteddrive').html(driveunit)

  			// console.log(driveunit)
  			initialoptionspreload();

  		});

  	}

  	if (s.os.name == "linux" || s.os.name == "macos") {


        window.driveunit = " ";
        $('#selecteddrive').html("/" + driveunit)

        initialoptionspreload();

    }

  }
  else {

  	driveunit = localStorage["lastuseddriveunit"];
  	initialoptionspreload();

  }


  function initialoptionspreload() {

    window.databaselistdb = [];
    var request = window.indexedDB.open("tagstoo_databaselist_1100", 1);
    request.onerror = function(event) {  };

    request.onupgradeneeded = function(event) {

      var objectStore;
      databaselistdb = event.target.result;

      objectStore = databaselistdb.createObjectStore("databases", { keyPath: "dbid", autoIncrement:true });
      objectStore.createIndex("dbname", "dbname", { unique: true });
    }

    request.onsuccess = function(event) {

      databaselistdb = request.result;
      var objectStore = databaselistdb.transaction("databases").objectStore("databases");

      objectStore.openCursor().onsuccess = function(event) {

        var cursor = event.target.result;
        if (cursor) {

          listadofiltradodeDB.push(cursor.value.dbname)
          cursor.continue();

        } else { // cuando haya llegado al último

          var currentlydatabaseused = localStorage["currentlydatabaseused"];          

          if (!currentlydatabaseused) {
            setTimeout(function(){
            if(!listadofiltradodeDB[0]) {
              alert(ph_alr_01or02a + ".");
            } else {
              alert(ph_alr_01or02a + ph_alr_02b);
            }
            }, 1000);
          }

          if (currentlydatabaseused) {

            $('#selecteddb').html(currentlydatabaseused)          

            if (!listadofiltradodeDB[0]) {

              if (!localStorage["showretroagain"]) {
                localStorage["showretroagain"] = "yes";
              }

              if (localStorage["showretroagain"] == "yes") {
                alertify.alert(ph_alr_03);
              }

            }

          }

          loaddatabaseselect();
          loaddriveslist();

          if (driveunit) {
            if (s.os.name == "windows" || s.os.name == "macos") {
                 $('#selecteddrive').html(driveunit)
            }
            if (s.os.name == "linux") {
                 if(driveunit == " "){
                      $('#selecteddrive').html("/" + driveunit)
                 } else {
                    $('#selecteddrive').html(driveunit)
                 }
            }

          }

          $("#databaseselect").change(function() {

            $('#selecteddb').html($("#databaseselect").val());

          });

          // on change

          $("#unitselect").change(function() {

            if (s.os.name == "windows") {

             var availabledrives=[];

             $('#selecteddrive').html($("#unitselect").val());

              var drivelist = require('drivelist');
              var driveLetters = require('windows-drive-letters');

              var t="";
              var tdesc="";

              availabledrives = drivelist.list((error, drives) => {
                if (error) {
                  throw error;
                }

                drives.forEach((drive, i) => {

                  i= i+1;

                  t += "<option value='" + drive.mountpoints["0"].path + "'>" + drive.mountpoints["0"].path + "</option>"
                  tdesc += "<div value='" + drive.mountpoints["0"].path + "' class='drivedesc'>" + drive.description + "</div>"

                });

                // para detectar unidades virtuales en windows y añadirlas a la lista
                try {
                  letters = driveLetters.usedLettersSync();
                  // console.log(letters); // => ['C', 'D', ...]
                } catch (err) {};

                $.each (letters, function(i){

                  unidadvirtual = "si";
                  drives.forEach((drive, u) => {

                    if (letters[i]+":" == drive.mountpoints["0"].path ) {
                      unidadvirtual = "no";
                    }

                  });

                  if (unidadvirtual == "si") {
                    t += "<option value='" + letters[i] + ":'>" + letters[i] + ":</option>"
                    tdesc += "<div value='" + letters[i] + ":' class='drivedesc'>Virtual Drive</div>"
                  }


                });

                $("#unitselect").html(t);
                $("#unitselect").val($('#selecteddrive').html());

                $("#drivedesc").css("display","none")
                $("#drivedesc").html("("+tdesc+")");

                // se pintará solo la info del drive seleccionado
                $.each($("#drivedesc div"), function(n) {

                  if($(this).attr("value") != $("#selecteddrive").html()) {

                    $(this).remove()

                  }

                });

                $("#drivedesc").css("display","inline-block");

              });

            }


            if (s.os.name == "linux") {

              console.log($("#unitselect").val())

              if ($("#unitselect").val() != "") {
                $('#selecteddrive').html( "/" + $("#unitselect").val() );
              } else {
                $('#selecteddrive').html("/")
              }

              drives = [""];

              // Detectar y añadir unidades externas a la lista

              const username = require('username');

              username().then(username => {

                var dirtoread = "/media/" + username // la carpeta donde se montan las unidades externas
                var re = /(?:\.([^.]+))?$/; // expresión regular para detectar si un string tiene extensión

                var directoryelement = [];
                var directorycontent = [];
                window.directoryarchives = [];
                window.directoryfolders = [];

                var readedElements = fs.readdirSync(dirtoread)
                var iteratentimes = readedElements.length;

                for (i = 0; i < iteratentimes; i++) {

                  var ext = re.exec(readedElements[i])[1];
                  if (!ext) {
                    ext="&nbsp;";
                  }

                  // comprobar si es carpeta o archivo. En principio solo deveria haber carpetas correspondientes a las unidades, pero por si acaso...
                  var dirtoreadcheck = dirtoread + "\/" + readedElements[i];

                  try {
                    var arorfo = "i_am_an_archive";
                    var arorfo = fs.readdirSync(dirtoreadcheck);
                  }
                  catch(exception) {};

                  directoryelement.name = readedElements[i]

                  var copied_directoryelement = jQuery.extend({}, directoryelement); // necesario trabajar con una copia para actualizar el objeto directorycontent
                  directorycontent[i] = copied_directoryelement;
                };

                // separa carpetas y archivos en dos objetos
                var i = 0;
                var ii = 0;
                var iii = 0;

                $.each(directorycontent, function(i) {

                  if (directorycontent[i].arorfo != "i_am_an_archive" || directorycontent[i].arorfo == undefined || directorycontent[i].name == "Documents and Settings") {
                    directoryfolders[ii] = directorycontent[i];

                    ii++;
                  } else {
                    directoryarchives[iii] = directorycontent[i];
                    iii++;
                  };
                });

                // se añaden las carpetas detectadas como unidades externas disponibles
                $.each(directoryfolders, function(i) {
                  drives.push("media/" + username + "/" + directoryfolders[i].name);
                });

                var t="";
                var tdesc="";

                $.each (drives, function(i){

                  if (drives[i] == ""){
                    t += "<option value=' " + drives[i] + "'>/" + drives[i] + "</option>";
                    tdesc += "<div value=' " + drives[i] + "' class='drivedesc'>" + ph_localdisk + "</div>";
                  } else {
                    t += "<option value='" + drives[i] + "'>/" + drives[i] + "</option>";
                    tdesc += "<div value='" + drives[i] + "' class='drivedesc'>" + ph_exterdisk + "</div>";
                  }

                });

                $("#unitselect").html(t);
                $("#unitselect").val("");

                $("#drivedesc").css("display","none")
                $("#drivedesc").html("("+tdesc+")");

                // se pintará solo la info del drive seleccionado
                $.each($("#drivedesc div"), function(n) {

                  if("/" + $(this).attr("value") != $("#selecteddrive").html()) {

                    $(this).remove()

                  }

                });

                $("#drivedesc").css("display","inline-block");

              });

            }


            if (s.os.name == "macos") {

              console.log($("#unitselect").val())

              if ($("#unitselect").val() != "") {
                $('#selecteddrive').html( "/" + $("#unitselect").val() );
              } else {
                $('#selecteddrive').html("/")
              }

              drives = [""];

              // Detectar y añadir unidades

              var dirtoread = "/Volumes" ;
              var re = /(?:\.([^.]+))?$/; // expresión regular para detectar si un string tiene extensión

              var directoryelement = [];
              var directorycontent = [];
              window.directoryarchives = [];
              window.directoryfolders = [];

              var readedElements = fs.readdirSync(dirtoread)
              var iteratentimes = readedElements.length;

              for (i = 0; i < iteratentimes; i++) {

                var ext = re.exec(readedElements[i])[1];
                if (!ext) {
                  ext="&nbsp;";
                }

                // comprobar si es carpeta o archivo. En principio solo deveria haber carpetas correspondientes a las unidades, pero por si acaso...
                var dirtoreadcheck = dirtoread + "\/" + readedElements[i];

                try {
                  var arorfo = "i_am_an_archive";
                  var arorfo = fs.readdirSync(dirtoreadcheck);
                }
                catch(exception) {};

                directoryelement.name = readedElements[i]

                var copied_directoryelement = jQuery.extend({}, directoryelement); // necesario trabajar con una copia para actualizar el objeto directorycontent
                directorycontent[i] = copied_directoryelement;
              };

              // separa carpetas y archivos en dos objetos
              var i = 0;
              var ii = 0;
              var iii = 0;

              $.each(directorycontent, function(i) {

                if (directorycontent[i].arorfo != "i_am_an_archive" || directorycontent[i].arorfo == undefined || directorycontent[i].name == "Documents and Settings") {
                  directoryfolders[ii] = directorycontent[i];

                  ii++;
                } else {
                  directoryarchives[iii] = directorycontent[i];
                  iii++;
                };
              });

              // se añaden las carpetas detectadas como unidades externas disponibles
              $.each(directoryfolders, function(i) {
                drives.push("Volumes/" + directoryfolders[i].name);
              });

              var t="";
              var tdesc="";

              $.each (drives, function(i){

                if (drives[i] != ""){
                  t += "<option value='" + drives[i] + "'>" + drives[i] + "</option>";
                  tdesc += "<div value='" + drives[i] + "' class='drivedesc'>" + "" + "</div>"; + "</div>";
                }

              });

              // $("#unitselect").html(t);
              // $("#unitselect").val("");

              $("#drivedesc").css("display","none")
              $("#drivedesc").html("("+tdesc+")");

              // se pintará solo la info del drive seleccionado
              $.each($("#drivedesc div"), function(n) {

                if("/" + $(this).attr("value") != $("#selecteddrive").html()) {

                  $(this).remove()

                }

              });

              $("#drivedesc").css("display","inline-block");

            }

          });


          $("#newdatabase").on('click', function(){

            if($("#newdatabasename").val() != "" ){

              var preexistingname = "no";

              $.each (listadofiltradodeDB, function(i) {
                if (listadofiltradodeDB[i] == $("#newdatabasename").val()) {
                  preexistingname = "yes";
                }

              });

              if(preexistingname=="no") {

                $('#selecteddb').html($("#newdatabasename").val())
              }
              else {
                alertify.alert(ph_alr_04)
              }

            }
            else {
              alertify.alert(ph_alr_05)
            }

          });
          // lo mismo si se pulsa enter..
          $('#newdatabasename').on('keypress', function (e) {
              if(e.which === 13){

                if($("#newdatabasename").val() != "" ){

                var preexistingname = "no";

                $.each (listadofiltradodeDB, function(i) {
                  if (listadofiltradodeDB[i] == $("#newdatabasename").val()) {
                    preexistingname = "yes";
                  }

                });

                if(preexistingname=="no") {

                  $('#selecteddb').html($("#newdatabasename").val())
                }
                else {
                  alertify.alert(ph_alr_04)
                }

              }
              else {
                alertify.alert(ph_alr_05)
              }

              };
            });


          $("#inportdata").on('click', function(){

            if ($('#selecteddb').html() != "") {

              alertify.alert(ph_alr_06, function () {

                document.getElementById('toinportfile').value = ""; // esto es para que siempre funcione el on change

                document.getElementById('toinportfile').click()

                $('#toinportfile').off('change'); // para que no se acumulen event handlers (para que no se repita..);

                $('#toinportfile').on('change', function() {

                  var file = $('#toinportfile')["0"].value

                  fs.readFile(file, 'utf8', function (err,data) {
                    if (err) {
                      return console.log(err);
                    }

                    try {
                      // se comprueba si es json
                      JSON.parse(data);
                      // console.log("is JSON");

                      // y continua
                      alertify.confirm(ph_alc_01a + $('#selecteddb').html() + ph_alc_01b + file + ph_alc_01c, function (e) {
                        if (!e) {
                          x = "You pressed Cancel!";
                          console.log(x);
                        } else {
                          x = "You pressed OK!";
                          console.log(x)

                          // habrimos la bd
                          var tooverwritedb = [];
                          var request = window.indexedDB.open($('#selecteddb').html(), 1);
                          request.onerror = function(event) {
                            console.log("error: database not loaded");
                          };

                          // aquí realizamos algunas operaciones previas con la bd porque luego si no puede dar fallos a la hora de escribir si está no se ha abierto nunca...
                          request.onupgradeneeded = function(event) {

                            var objectStore;
                            var db = event.target.result;

                            tagData = [
                              { tagtext: "Demo1", tagpos: 0, tagcolor: "66B032", tagform: "tag_fruit" },
                              { tagtext: "DemoTag2", tagpos: 1, tagcolor: "3D01A4", tagform: "tag_classicframe1" },
                              { tagtext: "DemoTag3", tagpos: 2, tagcolor: "0391CE", tagform: "tag_cylinder" },
                              { tagtext: "Demo4", tagpos: 3, tagcolor: "FE2914", tagform: "tag_piggybank" },
                              { tagtext: "DemoTag5", tagpos: 4, tagcolor: "FD5308", tagform: "tag_maletin" }
                            ];

                            objectStore = db.createObjectStore("tags", { keyPath: "tagid", autoIncrement:true });
                            objectStore.createIndex("tagtext", "tagtext", { unique: false });
                            objectStore.createIndex("tagpos", "tagpos", { unique: false });
                            objectStore.createIndex("tagcolor", "tagcolor", { unique: false });
                            objectStore.createIndex("tagform", "tagform", { unique: false });
                            if(localStorage["demotags"]=="no") {
                              window.demotags = localStorage["demotags"];
                            } else {
                              window.demotags = "yes";
                            }
                            if (demotags == "yes") {
                              for (var i in tagData) {
                                objectStore.add(tagData[i]);
                              }
                            }

                            objectStore = db.createObjectStore("folders", { keyPath: "folderid", autoIncrement:true });
                            objectStore.createIndex("folder", "folder", { unique: true });
                            objectStore.createIndex("foldertags", "foldertags", { unique: false, multiEntry: true });

                            objectStore = db.createObjectStore("files", { keyPath: "fileid", autoIncrement:true });
                            objectStore.createIndex("filefolder", "filefolder", { unique: false });
                            objectStore.createIndex("filename", "filename", { unique: false });
                            objectStore.createIndex("fileext", "fileext", { unique: false });
                            objectStore.createIndex("filetags", "filetags", { unique: false });

                            objectStore = db.createObjectStore("favfolds", { keyPath: "favfoldid", autoIncrement:true });
                            objectStore.createIndex("favfoldname", "favfoldname", { unique: true });


                          };

                          request.onsuccess = function(event) {

                            var db = event.target.result;

                            tooverwritedb = request.result;

                            var idbExportImport = require("indexeddb-export-import"); // to save and load the contents of an IndexedDB database
                            // se vaciá y después se escribe en la base de datos
                            idbExportImport.clearDatabase(tooverwritedb, function(err) {

                              if(err) {
                                console.log(err)
                              } else {
                                console.log("data cleared");

                                idbExportImport.importFromJsonString(tooverwritedb, data, function(err2) { }); // no meto el código dentro porque desafortunadamente no funciona. Sigue el código a continuación y doy por hecho que ha escrito bien.

                                alertify.alert(ph_alr_07);

                              }

                            });

                          }

                        }

                      });

                    } catch (e) {
                      console.log("not JSON");
                      alertify.alert(ph_alr_08a + file + ph_alr_08b, function () {
                        document.getElementById('toinportfile').click();
                      });

                    }

                  });

                });
              });

            } else {
              alertify.alert(ph_alr_09);
            }

          }); // --fin importdata onclick

          $("#deletedb").on('click', function(){

            if ($('#selecteddb').html() != "") {

              alertify.confirm(ph_alc_02a + $('#selecteddb').html() + ph_alc_02b, function (e) {
                if (!e) {
                  x = "You pressed Cancel!";
                  console.log(x);
                } else {
                  x = "You pressed OK!";
                  console.log(x)

                  var DBDeleteRequest = window.indexedDB.deleteDatabase($('#selecteddb').html());

                  DBDeleteRequest.onerror = function(event) {
                    console.log("Error deleting database.");
                  };

                  DBDeleteRequest.onsuccess = function(event) {


                    // se ha de borrar tambien del listado de bases de datos
                    var requestdblist = window.indexedDB.open("tagstoo_databaselist_1100", 1);   

                    requestdblist.onsuccess = function(event) {      

                      var databaselistdb = request.result;


                      var trans = databaselistdb.transaction(["databases"], "readwrite")
                      var objectStore = trans.objectStore("databases")
                      var req = objectStore.openCursor();

                      req.onerror = function(event) {

                        console.log("error: " + event);
                      };

                      req.onsuccess = function(event) {

                        var cursor = event.target.result;

                        if(cursor) {

                          if(cursor.value.dbname == $('#selecteddb').html()) {

                            var res2 = cursor.delete(cursor.value.dbid);

                          }

                          cursor.continue();

                        }

                      }

                    }


                    // se borra del localstorage si la base de datos borrada es la que estaba señalizada en el localstorage
                    if (localStorage["currentlydatabaseused"] == $('#selecteddb').html()) {
                       localStorage.removeItem("currentlydatabaseused");
                    }

                    alertify.alert(ph_alr_10, function () {
                      location.reload();
                    });

                  };

                }

              });
            } else {
              alertify.alert(ph_alr_11);
            }

          });







        }

      };


        

      

  	}; // --fin onsucces

  }



  function loaddatabaseselect() {

  	$("#databaseselect").find('option').remove().end(); // con esto se vacían las opciones del select para volver a llenarlo con las lineas de abajo

    setTimeout(function () { //necesario para que le de tiempo a cargar la lista.

    	$.each(listadofiltradodeDB, function(i){
        var opt = document.getElementById("databaseselect");
        var option = document.createElement("option");
    		option.value = listadofiltradodeDB[i];
    		var optionText = document.createTextNode(option.value);
    		option.appendChild(optionText);
    		opt.appendChild(option);
    		opt.selectedIndex = -1; // para que ninguna este por defecto seleccionada
      })

    }, 450)

  }

  function loaddriveslist() {

    if (s.os.name == "windows") {

      var availabledrives=[];
    	var drivelist = require('drivelist');
    	var driveLetters = require('windows-drive-letters');

    	var t="";
    	var tdesc="";
    	var letters=[];

    	availabledrives = drivelist.list((error, drives) => {
    		if (error) {
    			throw error;
    		}

    		drives.forEach((drive, i) => {

    			i= i+1;
    			t += "<option value='" + drive.mountpoints["0"].path + "'>" + drive.mountpoints["0"].path + "</option>"
    			tdesc += "<div value='" + drive.mountpoints["0"].path + "' class='drivedesc'>" + drive.description + "</div>"

    		});

    		// para detectar unidades virtuales en windows y añadirlas a la lista
    		try {
    			letters = driveLetters.usedLettersSync();
    			// console.log(letters); // => ['C', 'D', ...]
    		} catch (err) {};

    		$.each (letters, function(i){

    			var unidadvirtual = "si";

    			drives.forEach((drive, u) => {
    				if (letters[i]+":" == drive.mountpoints["0"].path ) {
    					unidadvirtual = "no";
    				}
    			});

    			if (unidadvirtual == "si") {
    				t += "<option value='" + letters[i] + ":'>" + letters[i] + ":</option>"
    				tdesc += "<div value='" + letters[i] + ":' class='drivedesc'>Virtual Drive</div>"
    			}

    		});


    		$("#unitselect").html(t);
    		$("#unitselect").val("");

    		$("#drivedesc").css("display","none")
    		$("#drivedesc").html("("+tdesc+")");


    		// se pintará solo la info del drive seleccionado
    		if ($("#selecteddrive").html()) {
    			$.each($("#drivedesc div"), function(n) {

    				if($(this).attr("value") != $("#selecteddrive").html()) {

    					$(this).remove()

    				}

    			});
    		}
    		else { // este caso es para el inicio cuando no le ha dado tiempo a pintar el selecteddrive
    			$.each($("#drivedesc div"), function(n) {

    				if($(this).attr("value") != driveunit) {

    					$(this).remove()

    				}

    			});

    		}

    		if($("#drivedesc").html() == "()") {
    			$("#drivedesc").html(ph_cantloaddrive)
    		}

    		$("#drivedesc").css("display","inline-block");

    	});

    }

    
    if (s.os.name == "linux") {

      // console.log($("#unitselect").val())

      // if ($("#unitselect").val() != "") {
      //   $('#selecteddrive').html( "/" + $("#unitselect").val() );
      // } else {
      //   $('#selecteddrive').html("/")
      // }

      drives = [""];

      // Detectar y añadir unidades externas a la lista

      const username = require('username');

      username().then(username => {

        var dirtoread = "/media/" + username // la carpeta donde se montan las unidades externas
        var re = /(?:\.([^.]+))?$/; // expresión regular para detectar si un string tiene extensión

        var directoryelement = [];
        var directorycontent = [];
        window.directoryarchives = [];
        window.directoryfolders = [];

        var readedElements = fs.readdirSync(dirtoread)
        var iteratentimes = readedElements.length;

        for (i = 0; i < iteratentimes; i++) {

          var ext = re.exec(readedElements[i])[1];
          if (!ext) {
            ext="&nbsp;";
          }

          // comprobar si es carpeta o archivo. En principio solo deveria haber carpetas correspondientes a las unidades, pero por si acaso...
          var dirtoreadcheck = dirtoread + "\/" + readedElements[i];

          try {
            var arorfo = "i_am_an_archive";
            var arorfo = fs.readdirSync(dirtoreadcheck);
          }
          catch(exception) {};

          directoryelement.name = readedElements[i]

          var copied_directoryelement = jQuery.extend({}, directoryelement); // necesario trabajar con una copia para actualizar el objeto directorycontent
          directorycontent[i] = copied_directoryelement;
        };

        // separa carpetas y archivos en dos objetos
        var i = 0;
        var ii = 0;
        var iii = 0;

        $.each(directorycontent, function(i) {

          if (directorycontent[i].arorfo != "i_am_an_archive" || directorycontent[i].arorfo == undefined || directorycontent[i].name == "Documents and Settings") {
            directoryfolders[ii] = directorycontent[i];

            ii++;
          } else {
            directoryarchives[iii] = directorycontent[i];
            iii++;
          };
        });

        // se añaden las carpetas detectadas como unidades externas disponibles
        $.each(directoryfolders, function(i) {
          drives.push("media/" + username + "/" + directoryfolders[i].name);
        });

        var t="";
        var tdesc="";

        $.each (drives, function(i){

          if (drives[i] == ""){
            t += "<option value=' " + drives[i] + "'>/" + drives[i] + "</option>";
            tdesc += "<div value=' " + drives[i] + "' class='drivedesc'>" + ph_localdisk + "</div>";
          } else {
            t += "<option value='" + drives[i] + "'>/" + drives[i] + "</option>";
            tdesc += "<div value='" + drives[i] + "' class='drivedesc'>" + ph_exterdisk + "</div>";

          }

        });

        $("#unitselect").html(t);
        $("#unitselect").val("");

        $("#drivedesc").css("display","none")
        $("#drivedesc").html("("+tdesc+")");

        // se pintará solo la info del drive seleccionado
        $.each($("#drivedesc div"), function(n) {

          if("/" + $(this).attr("value") != $("#selecteddrive").html()) {

            $(this).remove()

          }

        });

        $("#drivedesc").css("display","inline-block");

      });

    }

    if (s.os.name == "macos") {

      drives = [""];

      // Detectar y añadir unidades
      
      var dirtoread = "/Volumes" ;
      var re = /(?:\.([^.]+))?$/; // expresión regular para detectar si un string tiene extensión

      var directoryelement = [];
      var directorycontent = [];
      window.directoryarchives = [];
      window.directoryfolders = [];

      var readedElements = fs.readdirSync(dirtoread)
      var iteratentimes = readedElements.length;

      for (i = 0; i < iteratentimes; i++) {

        var ext = re.exec(readedElements[i])[1];
        if (!ext) {
          ext="&nbsp;";
        }

        // comprobar si es carpeta o archivo. En principio solo deveria haber carpetas correspondientes a las unidades, pero por si acaso...
        var dirtoreadcheck = dirtoread + "\/" + readedElements[i];

        try {
          var arorfo = "i_am_an_archive";
          var arorfo = fs.readdirSync(dirtoreadcheck);
        }
        catch(exception) {};

        directoryelement.name = readedElements[i]

        var copied_directoryelement = jQuery.extend({}, directoryelement); // necesario trabajar con una copia para actualizar el objeto directorycontent
        directorycontent[i] = copied_directoryelement;
      };

      // separa carpetas y archivos en dos objetos
      var i = 0;
      var ii = 0;
      var iii = 0;

      $.each(directorycontent, function(i) {

        if (directorycontent[i].arorfo != "i_am_an_archive" || directorycontent[i].arorfo == undefined || directorycontent[i].name == "Documents and Settings") {
          directoryfolders[ii] = directorycontent[i];

          ii++;
        } else {
          directoryarchives[iii] = directorycontent[i];
          iii++;
        };
      });

      // se añaden las carpetas detectadas como unidades externas disponibles
      $.each(directoryfolders, function(i) {
        drives.push("Volumes/" + directoryfolders[i].name);
      });

      var t="";
      var tdesc="";

      $.each (drives, function(i){

        if (drives[i] != ""){
          t += "<option value='" + drives[i] + "'>" + drives[i] + "</option>";
          tdesc += "<div value='" + drives[i] + "' class='drivedesc'>" + "" + "</div>"; + "</div>";
        }

      });

      $("#unitselect").html(t);
      $("#unitselect").val("");

      $("#drivedesc").css("display","none")
      $("#drivedesc").html("("+tdesc+")");

      // se pintará solo la info del drive seleccionado
      $.each($("#drivedesc div"), function(n) {

        if("/" + $(this).attr("value") != $("#selecteddrive").html()) {

          $(this).remove()

        }

      });

      $("#drivedesc").css("display","inline-block");

    }

  };

  // console.log(localStorage["colortagstoo"])

  if (!localStorage["colortagstoo"]) {
    localStorage["colortagstoo"] = "yes";
  }

  window.colortagstoo = localStorage["colortagstoo"];

  if (window.colortagstoo == "not") {

    var ls = document.createElement('link');
    ls.rel="stylesheet";
    ls.href= "css/version_grey.css";
    document.getElementsByTagName('head')[0].appendChild(ls);

    // para que aparezca chequeado
    $(".coloronoffswitch-checkbox").addClass("check");
    $(".coloronoffswitch-switch").css("background","#bbb");

  }


  $(".coloronoffswitch-inner, .coloronoffswitch-switch").bind('click', function() {

    if(window.colortagstoo == "yes") {

        window.colortagstoo = "not";
        $(".coloronoffswitch-checkbox").addClass("check");
        $(".coloronoffswitch-switch").css("background","#bbb");

        var ls = document.createElement('link');
        ls.rel="stylesheet";
        ls.href= "css/version_grey.css";
        document.getElementsByTagName('head')[0].appendChild(ls);

    } else if (window.colortagstoo == "not") {

        window.colortagstoo = "yes";
        $(".coloronoffswitch-checkbox").removeClass("check");
        $(".coloronoffswitch-switch").css("background","linear-gradient(315deg,red,yellow,green)");

        $('link[rel=stylesheet][href~="css/version_grey.css"]').remove();

    }

  });


});

function starttagstoo() {

  if ($("#selecteddrive").html() != "") {
    if ($("#selecteddb").html() != "") {    
      if($("#drivedesc").html() != ph_cantloaddrive) {

        localStorage["colortagstoo"] = window.colortagstoo;
        localStorage["currentlydatabaseused"] = $("#selecteddb").html();

        if (s.os.name == "windows" || s.os.name == "macos") {
          localStorage["selecteddriveunit"] = $("#selecteddrive").html();
          localStorage["lastuseddriveunit"] = $("#selecteddrive").html();
        }
        if (s.os.name == "linux") {
          if ($("#selecteddrive").html() == "/ "){
            localStorage["selecteddriveunit"] = $("#selecteddrive").html().slice(2);
            localStorage["lastuseddriveunit"] = $("#selecteddrive").html().slice(2);
          } else {
            localStorage["selecteddriveunit"] = $("#selecteddrive").html();
            localStorage["lastuseddriveunit"] = $("#selecteddrive").html();
          }

        }

        window.parent.location.assign("main.html")

      }
      else {
        alertify.alert(ph_alr_12)
      }

    } else {
      alertify.alert(ph_alr_13)
    }

  } else {
    alertify.alert(ph_alr_12)
  }

};


function showretroagain() {        
  
  if ($('#showretroagain').prop('checked')){
    localStorage["showretroagain"] = "no";
  } else {
    localStorage["showretroagain"] = "yes";
  }

};
