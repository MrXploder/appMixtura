/* by MrXploder @ Mixtura SpA. */
appMixtura.controller('appController', ["$scope", "$rootScope", "$http", "$localStorage", "$timeout", "$interval", "$window", "$filter", "$location", function($scope, $rootScope, $http, $localStorage, $timeout, $interval, $window, $filter, $location){
	$timeout(function(){
		Materialize.updateTextFields();
		$('select').material_select();    
		$('.datepicker').pickadate({firstDay: true, selectMonths: true, selectYears: 1, closeOnSelect: true});
		$('.collapsible').collapsible();
		$('.tooltipped').tooltip({delay: 50});
		$("#detalleTicketModal").modal({dismissible:!1,opacity:.5,inDuration:300,outDuration:200,startingTop:"4%",endingTop:"10%",ready:function(o,i){},complete:function(){}});
		$("#detalleProyectoModal").modal({dismissible:!1,opacity:.5,inDuration:300,outDuration:200,startingTop:"4%",endingTop:"10%",ready:function(o,i){},complete:function(){}});
		$("#detalleClienteModal").modal({dismissible:!1,opacity:.5,inDuration:300,outDuration:200,startingTop:"4%",endingTop:"10%",ready:function(o,i){},complete:function(){}});
		$("#detalleTechDataServidorModal").modal({dismissible:!1,opacity:.5,inDuration:300,outDuration:200,startingTop:"4%",endingTop:"10%",ready:function(o,i){},complete:function(){}});
		$("#preloaderScreen").modal({dismissible:!1,opacity:.5,inDuration:300,outDuration:200,startingTop:"30%",endingTop:"30%"});
	},2000);


	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////
	////////////SCOPE VARIABLES AND FUNCTIONS////////////////////////////////////
	$scope.$watch('newTechData.tipo_techdata', function(){
		$scope.newTechData = {"tipo_techdata": $scope.newTechData.tipo_techdata};
	});

	$scope.modalEditableInput 					= true;
	$scope.detalleProyectDisabled 			= true;
	$scope.detalleClienteDisabled 			= true;
	
	$scope.sortTypeTickets    					= '1*id_tarea';
	$scope.sortReverseTickets 					= true;
	$scope.selectClienteForTicketFilter	= "";
	$scope.completedTicketsSwitchFilter = false;
	$scope.notShowCompletedTickets 			= "";

	var types  = ["Tickets", 						"Proyectos", 						"Programados", 						"Operadores", 					"Clientes", 					 "Servidores",                   "Equipos"];
	var modals = ["detalleTicketModal", "detalleProyectoModal", "detalleProgramadoModal", "detalleOperadorModal", "detalleClienteModal", "detalleTechDataServidorModal", "detalleTechDataEquipoModal"];
	
	$scope.searchTermTickets 	= "";
	$scope.searchTermProyects = "";
	$scope.searchTermTechData = "";

	$scope.selectedProyect 				= {};
	$scope.selectedProyectDefault = {};
	$scope.newProyect     				= {"id_solicitante": "0", "desc_proyecto": "", "id_cliente": ""};
	var newProyectDefault 				= angular.copy($scope.newProyect);

	$scope.selectedTicket 			 = {};
	$scope.selectedTicketDefault = {};
	$scope.newTicket     				 = {"id_cliente" : "", "prioridad_tarea" : "", "nom_solicitante" : "", "email_solicitante" : "", "desc_tarea" : "", "tipo" : ""};
	var newTicketDefault 				 = angular.copy($scope.newTicket);

	$scope.selectedScheduledTicket 				= {};
	$scope.selectedScheduledTicketDefault = {};
	$scope.newScheduledTicket 						= {"id_cliente":"", "prioridad_tarea":"", "nom_solicitante":"", "email_solicitante":"", "desc_tarea":"", "tipo":"", "modo":"0", "fec_calendarizacion":"", "periodo_dia":"0", "periodo_semana":"0"};
	var newScheduledTicket 								= angular.copy($scope.newScheduledTicket);

	$scope.selectedCliente 				= {};
	$scope.selectedClienteDefault = {};
	$scope.newClient     				  = {"nom_cliente" : "", "rut_cliente" : "", "sigla_cliente" : "", "dns" : "", "horas_pactadas" : 0, "sucursales":[{"nom_sucursal": "", "dir_sucursal": ""}]};
	var newClientDefault 					= angular.copy($scope.newClient);

	$scope.selectedOperator 			 = {};
	$scope.selectedOperatorDefault = {};
	$scope.newOperator     				 = {"nom_operador" : "", "rut_operador" : ""};
	var newOperatorDefault 				 = angular.copy($scope.newOperator);

	$scope.newAdministrator 		= {"superadmin_pass": "", "admin_id": ""};
	var newAdministratorDefault = angular.copy($scope.newAdministrator);

	var twoDigitMonth = $filter('date')(new Date(), 'M');
	var twoDigitYear  = $filter('date')(new Date(), 'yy');

	$scope.utilities = {"currentMonth": twoDigitMonth, "currentYear": twoDigitYear, "valorActualUF" : 0};
	$scope.facturar  = {"m": twoDigitMonth, "y": twoDigitYear};

	$scope.test = function(){
		fetchUserData();
	}

	$scope.reloadToolTip = function(){
		$timeout(function(){
			$('.tooltipped').tooltip({delay: 50});
		});
	};
	
	function fetchUserData(){
		if($localStorage.admin_token){
			$scope.admin_token = $localStorage.admin_token;

			if($localStorage.tickets && $localStorage.scheduled_tickets && $localStorage.proyects && $localStorage.clientes && $localStorage.sucursales && $localStorage.operadores && $localStorage.techdata_equipos){
				$scope.missing_table = "notmissing";
			}
			else{
				$scope.missing_table = "missing";
			}

			$http.get('/app/php/db_transactions/isAdmin.php', {params:{"admin_token" : $scope.admin_token, "missing_table" : $scope.missing_table}}).then(function successCallback(response){
				if(response.data.status === "found"){
					response.data.tareas 						  ? ($scope.tickets 					 = $localStorage.tickets 					 		= response.data.tareas) 						 : ($scope.tickets 					   = $localStorage.tickets);
					response.data.tareas_programadas  ? ($scope.scheduled_tickets = $localStorage.scheduled_tickets 		= response.data.tareas_programadas)  : ($scope.scheduled_tickets   = $localStorage.scheduled_tickets);
					response.data.proyectos					  ? ($scope.proyects 				 = $localStorage.proyects 				 			= response.data.proyectos) 				   : ($scope.proyects 				   = $localStorage.proyects);
					response.data.operadores				  ? ($scope.operadores 			 = $localStorage.operadores 			 			= response.data.operadores) 				 : ($scope.operadores 			   = $localStorage.operadores);
					response.data.clientes					  ? ($scope.clientes 				 = $localStorage.clientes 				 			= response.data.clientes) 					 : ($scope.clientes 				   = $localStorage.clientes);
					response.data.sucursales				  ? ($scope.sucursales				 = $localStorage.sucursales				    = response.data.sucursales)				   : ($scope.sucursales          = $localStorage.sucursales);
					response.data.techdata_equipos	  ? ($scope.techdata_equipos  = $localStorage.techdata_equipos      = response.data.techdata_equipos) 	 : ($scope.techdata_equipos    = $localStorage.techdata_equipos);
					response.data.techdata_servidores ? ($scope.techdata_servidores = $localStorage.techdata_servidores = response.data.techdata_servidores) : ($scope.techdata_servidores = $localStorage.techdata_servidores);

					$scope.isAdmin  = $localStorage.isAdmin  = {"status": true, "name": response.data.nom_operador};
					$scope.isClient = $localStorage.isClient = {"status": false, "name": ""};

					var xMax = 50; //año
					var yMax = 50; //mes
					var zMax = 100; //idCliente

					$scope.arr = new Array();

					for(i = 0; i < xMax; i++){
						$scope.arr[i] = new Array();
						for(j = 0; j < yMax; j++){
							$scope.arr[i][j] = new Array();
							for(k = 0; k < zMax; k++){
								$scope.arr[i][j][k] = 0;
							}
						}
					}

					$scope.tickets.forEach(function(ticket){
						if(!!ticket.timestamp_ejecucion){
							ticketConvertedDate = ticket.timestamp_ejecucion.split("-").reverse().join("-");
							ticketmonthNumber = $filter('date')(new Date(ticketConvertedDate), 'M');
							ticketyearNumber  = $filter('date')(new Date(ticketConvertedDate), 'yy');

							ticketmonthNumber        = parseInt(ticketmonthNumber);
							ticketyearNumber         = parseInt(ticketyearNumber);
							ticket.porcentaje_avance = parseInt(ticket.porcentaje_avance);
							ticket.id_cliente 			 = parseInt(ticket.id_cliente);
							ticket.cant_horas 			 = parseFloat(ticket.cant_horas);

							$scope.arr[ticketyearNumber][ticketmonthNumber][ticket.id_cliente] += ticket.cant_horas;
						}
					});

					$scope.proyects.forEach(function(proyect){
						proyect.id_cliente 				= parseInt(proyect.id_cliente);
						proyect.porcentaje_avance = parseInt(proyect.porcentaje_avance);
						proyect.cant_horas				= parseFloat(proyect.cant_horas);
					});

					$scope.isRouteLoading = false;
				}
				else{
					$localStorage.$reset();
					$scope.isRouteLoading = false;
				}
			}, function errorCallback(response){
				$scope.tickets 					 = $localStorage.tickets;
				$scope.scheduled_tickets = $localStorage.scheduled_tickets;
				$scope.proyects 				 = $localStorage.proyects;
				$scope.operadores 			 = $localStorage.operadores;
				$scope.clientes 				 = $localStorage.clientes;
				$scope.techdata_equipos  = $localStorage.techdata_equipos;

				$scope.isAdmin  = {"status": $localStorage.isAdmin.status, "name": $localStorage.isAdmin.name};
				$scope.isClient = {"status": $localStorage.isClient.status, "name": ""};
				
				$scope.isRouteLoading = false;
			});
		}
		else{
			$http.get('/app/php/db_transactions/isClient.php').then(function successCallback(response){
				if(response.data.status === "found"){
					$scope.tickets = response.data.tickets;
					$scope.isAdmin  = {"status": false, "name": ""};
					$scope.isClient = {"status": true, "id": response.data.id_cliente, "name": response.data.nom_cliente};

					$scope.newTicket.id_cliente      = $scope.isClient.id;
					$scope.newTicket.prioridad_tarea = "1";

					newTicketDefault = angular.copy($scope.newTicket);

					$scope.isRouteLoading = false;
				}
				else{
					$scope.isClient = {"status": false};
					$scope.isAdmin  = {"status": false};

					$scope.isRouteLoading = false;
				}
			}, function errorCallback(response){
				Materialize.toast('Error: No hay Conexión a Internet', 4000, 'red');				
				$scope.isRouteLoading = false;
			});
		}
	}

	fetchUserData();
	
	$scope.logOut = function(){
		$localStorage.$reset();
		$window.location.reload();
	};

	$scope.openModal = function(type, selectedData){
		$scope.modalEditableInput = true;
		var typeIndex = types.indexOf(type);
		switch(type){
			case 'Tickets':
			$scope.selectedTicket 			 = angular.copy(selectedData);
			$scope.selectedTicketDefault = angular.copy(selectedData);
			break;
			case 'Proyectos':
			$scope.selectedProyect 				= angular.copy(selectedData);
			$scope.selectedProyectDefault = angular.copy(selectedData);
			break;
			case 'Servidores':
			$scope.selectedTechDataServidor = angular.copy(selectedData);
			break;
			case 'Equipos':
			$scope.selectedTechDataEquipo = angular.copy(selectedData);
			break;
		}
		$('#'+modals[typeIndex]).modal('open');
	};

	$scope.editModalData = function(){
		$scope.modalEditableInput = false;
	};

	$scope.undoModalData = function(type){
		if(!$scope.modalEditableInput){
			switch(type){
				case 'Tickets':
				$scope.selectedTicket = angular.copy($scope.selectedTicketDefault);
				break;
				case 'Proyects':
				$scope.selectedProyect = angular.copy($scope.selectedProyectDefault);
				break;
				case 'Clientes':
				$scope.selectedCliente = angular.copy($scope.selectedClienteDefault);
				break;
			}
		}
		$scope.modalEditableInput = true;
	};

	$scope.saveModalData = function(type){
		$('#preloaderScreen').modal('open');
		var updateDir = ["updateTicket.php", "updateProyect.php", "updateClient.php"];
		var data  		= [$scope.selectedTicket, $scope.selectedProyect, $scope.selectedCliente];
		
		var typeIndex = types.indexOf(type);
		$http.post('/app/php/db_transactions/'+updateDir[typeIndex], data[typeIndex]).then(function successCallback(response){
			if (response.data.status == "success") {
				Materialize.toast('Modificado con Éxito!', 5000, 'green');
				$('#'+modals[typeIndex]).modal('close');
				fetchUserData(true);
			}
			else{
				Materialize.toast('Error: '+response.data.status+' Codigo: '+response.data.code, 5000, 'amber text-black');
				$('#preloaderScreen').modal('close');
			}
		}, function errorCallback(response){
			Materialize.toast('Error: No hay Conexión a Internet', 5000, 'red');
			$('#preloaderScreen').modal('close');
		});
	};

	$scope.exitModal = function(type){
		var typeIndex = types.indexOf(type);
		$('#'+modals[typeIndex]).modal('close');
	};

	$scope.eliminarDatos = function(type, data){
		var types = ["Ticket", 					 "Proyectos", 				"Programados", 					 		 "Operadores", 		 		 "Clientes",         "Servidores",                 "Equipos"];
		var dirs  = ["deleteTicket.php", "deleteProyect.php", "deleteScheduledTicket.php", "deleteOperator.php", "deleteClient.php", "deleteTechDataServidor.php", "deleteTechDataEquipo.php"];
		typeIndex = types.indexOf(type);

		if($window.confirm('¿Estas seguro?')){
			$('#preloaderScreen').modal('open');
			$http.post('/app/php/db_transactions/'+dirs[typeIndex], data).then(function successCallback(response){
				if(response.data.status == "success"){
					Materialize.toast('Eliminado con Éxito, actualizando.', 5000, 'green');
					fetchUserData();
				}
				else{
					Materialize.toast('Error: '+response.data.status+' Codigo: '+response.data.code, 5000, 'amber text-black');
					$('#preloaderScreen').modal('close');
				}
			}, function errorCallback(response){
				Materialize.toast('Error, no hay Conexión a Internet', 5000, 'red');
				$('#preloaderScreen').modal('close');
			});
		}
	};

	$scope.calculateAfterHours = function(horasPactadas, horasEjecutadas){
		if(horasEjecutadas > horasPactadas){
			var afterHours = horasEjecutadas - horasPactadas;
			return afterHours.toFixed(2);
		}
		else{
			return 0;
		}
	};

	$scope.formSubmit = function(nom_formulario){
		$('#preloaderScreen').modal('open');
		var formToSend    = ['crearTicket', 	 'crearProyecto', 	'crearTicketProgramado', 	 'crearCliente', 	 'crearOperador', 	 'crearTechData', 	 'registrarAdministrador'];
		var addressToSend = ['saveTicket.php', 'saveProyect.php', 'saveScheduledTicket.php', 'saveClient.php', 'saveOperator.php', 'saveTechData.php', 'getAdmin.php'];
		var objectToSend  = [$scope.newTicket, $scope.newProyect, $scope.newScheduledTicket, $scope.newClient, $scope.newOperator, $scope.newTechData, $scope.newAdministrator];
		
		var mainIndex = formToSend.indexOf(nom_formulario);

		$http.post('/app/php/db_transactions/'+addressToSend[mainIndex], objectToSend[mainIndex]).then(function successCallback(response){
			if(response.data.status === "success"){
				Materialize.toast('Creado con Exito', 5000, 'green');
				$window.location.reload();
			}
			else if(response.data.status === "found"){
				$localStorage.admin_token = response.data.admin_token;
				Materialize.toast('Ingresado con Exito', 5000, 'green');
				fetchUserData();
				$('#preloaderScreen').modal('close');
			}
			else{
				Materialize.toast('Error: '+response.data.status+' Codigo: '+response.data.code, 5000, 'amber');
				$('#preloaderScreen').modal('close');
			}
		}, function errorCallback(response){
			Materialize.toast('Error: No hay Conexión a Internet', 5000, 'red');
			$('#preloaderScreen').modal('close');
		});
	};

	$scope.downloadReport = function(year, month, id_cliente, nom_cliente){
		$('#preloaderScreen').modal('open');
		id_cliente = parseInt(id_cliente);
		month 		 = parseInt(month);
		year  		 = parseInt(year);

		var json = angular.copy($scope.tickets);
		var report = [{}];
		var currentDate = $filter('date')(new Date(), 'dd-MM-yyyy');

		report[0] = ["Reportando las Tareas Completadas"];
		report[1] = ["Reporte Generado el: ", currentDate];
		report[2] = ["Cliente: ", nom_cliente];
		report[3] = ["Nº Solicitud", "Nombre del Solicitante", "Email del Solicitante", "Descripción del Requerimiento", "Tipo Solicitud", "Horas", "Ejecutor", "Fec. Ejecución"];

		json = $filter('orderBy')(json, 'timestamp_ejecucion', true);
		json.forEach(function(item, index){
			if(!!item.timestamp_ejecucion){
				ticketConvertedDate  = item.timestamp_ejecucion.split("-").reverse().join("-");
				ticketmonthNumber    = $filter('date')(new Date(ticketConvertedDate), 'M');
				ticketyearNumber     = $filter('date')(new Date(ticketConvertedDate), 'yy');
				ticketmonthNumber    = parseInt(ticketmonthNumber);
				ticketyearNumber     = parseInt(ticketyearNumber);
				porcentajeCompletado = parseInt(item.porcentaje_avance);

				if(item.id_cliente == id_cliente && ticketyearNumber == year && ticketmonthNumber == month && porcentajeCompletado == 100){
					report.push([item.id_tarea, item.nom_solicitante, item.email_solicitante, item.desc_tarea, item.tipo, item.cant_horas, item.nom_ejecutor1, item.timestamp_ejecucion]);
				}
			}
		});

		report.push([" "]);
		report.push([" ", " ", " ", " ", "Total:", $scope.arr[year][month][id_cliente]]);

		var ws = XLSX.utils.aoa_to_sheet(report);
		var wb = XLSX.utils.book_new();
		
		XLSX.utils.book_append_sheet(wb, ws, "Resumen");

		var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});

		saveAs(new Blob([wbout],{type:"application/octet-stream"}), nom_cliente+"-reporte.xlsx");
		$('#preloaderScreen').modal('close');
	};

	$scope.resolveColumn = function(modo, fec_calendarizacion, periodo_semana, periodo_dia){
		modo 					 = parseInt(modo);
		periodo_semana = parseInt(periodo_semana);
		periodo_dia 	 = parseInt(periodo_dia);
		
		var dowMap = ["", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
		var domMap = ["", "Primer", "Segundo", "Tercer", "Cuarto"];
		if(modo == 1){
			return 'Solo una Vez, el: '+fec_calendarizacion;
		}
		else if(modo == 2){
			return 'Una vez al dia';
		}
		else if(modo == 3){
			return 'Una vez a la semana, todos los '+dowMap[periodo_dia];
		}
		else if(modo == 4){
			return 'El '+domMap[periodo_semana]+' '+dowMap[periodo_dia]+' de cada Mes';
		}
	};

	$scope.agregarCampoSucursal = function(object){
		object.sucursales.push({"nom_sucursal": "", "dir_sucursal": ""});
	};

	$scope.quitarCampoSucursal = function(object, index){
		object.sucursales.splice(index, 1);
	}

	$scope.emptyForm = function(formName){
		var e = document.getElementsByName(formName)[0];
		var wrappedE = angular.element(e);
	}
}]);//close controller