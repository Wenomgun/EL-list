/* Основная функция генерирующая наш элемент list */

function createElementList(parentElementID, listElementID, inputArray, fieldsArray, w, h, fieldGroup) {
	$(document).ready(function() {
		var groupBox = new Set(); // сет групп, будет определяться в дальнейшем

		/* по умолчанию */

		var weihtEL = w || 200;  // ширина создаваемого списка
		var heightEL = h || 320; // высота создаваемого списка

		/* сортируем входящие данные по полю группы "fieldGroup" */

		inputArray.sort(function (a, b) {
			return (a[fieldGroup] > b[fieldGroup]) ? 1 : ((b[fieldGroup] > a[fieldGroup]) ? -1 : 0);
		});

		/* определяем группы */

		for(var i = 0; i < inputArray.length; i++){
			var finishGroup;   // группа
			var field = inputArray[i][fieldGroup];

			/*определяем является ли датой поле группировки, и добавляем группу в сет
			(если дата, то группу отображаем ввиде даты, если нет - отображаем как первую букву)*/

			if(field.getDate!=undefined && field.getDay()!=undefined && field.getFullYear()!=undefined) {
				var formated_date = field.getDate()+"-"+(field.getMonth()+1)+"-"+field.getFullYear();
                finishGroup = formated_date;
			} else {
                finishGroup = inputArray[i][fieldGroup][0];
			}

			groupBox.add(finishGroup);
		}

		var groupBoxArr = Array.from(groupBox); // массив определенных групп

		/* создаем основные элементы с уникальными идентификаторами*/

		var div_el_box = $('<div id=' + listElementID + '></div>');
		var h1_el_header = $('<h1 id="' + listElementID+ '-el-header"></h1>');
		var div_el_main_area = $('<div id="' + listElementID + '-el-main-area"></div>');
		var div_el_innerDiv = $('<div id="' + listElementID + '-innerDiv"></div>');

		$(parentElementID).append(div_el_box);
		div_el_box.append(h1_el_header);
		div_el_box.append(div_el_main_area);
		div_el_main_area.append(div_el_innerDiv);

		/* логика отображения данных в виде записей */

		for (var i = 0; i < groupBoxArr.length; i++) {
			var curGroup = groupBoxArr[i]; // текущая группа
			var flGroup = true;            // флаг для добавления заголовка группы
			for (var j = 0; j < inputArray.length; j++) {
				var curName = inputArray[j][fieldGroup];
				var fl = true;   // флаг для определения является ли поле группировки датой

				if(curName.getDate!=undefined && curName.getDay()!=undefined && curName.getFullYear()!=undefined) {
					var formated_date = curName.getDate()+"-"+(curName.getMonth()+1)+"-"+curName.getFullYear();
					curName = formated_date;
					fl = false;
				}

                /* формируем дополнительную информацию для отображения в записях списка */

				var info = "" ;
				if (fieldsArray) {
					for (var k = 0; k < fieldsArray.length; k++) {
						var nameField = fieldsArray[k];
						info += inputArray[j][nameField] + " ";
					}
				}

				/* генерация записей учитывая группировку и доп. информацию */

				var curNameGroup = fl? curName[0] : curName;
				if (curGroup == curNameGroup) {
					if (flGroup) {
						var div_el_alpha = $('<div class="' + listElementID + '-alpha" id=' + listElementID + '-' + curGroup + '>' + curGroup + '</div>');
						var table_el_innerTable = $('<table cellspacing="0" class="' + listElementID + '-innerTable" id=' + listElementID + '-table-for-' + curGroup + '></table>');
						div_el_innerDiv.append(div_el_alpha);
						div_el_innerDiv.append(table_el_innerTable);
						flGroup = false;
					}
					var row_el_innerText = '<tr><td><span class="' + listElementID + '-innerText">' + '<b>' + curName + '</b> ' + info + '</span></td></tr>';
					table_el_innerTable.append(row_el_innerText);
				}
			}
		}

		/* генерация остальных элементов компонента список*/

		//фильтр

		var div_el_filter = $('<div class="filter-name" id="' + listElementID + '-filterInput"></div>');
		var input_el_filter = $('<input type="text" id="' + listElementID + '-filter-name"  placeholder="Search...">');
		h1_el_header.append(div_el_filter);
		div_el_filter.append(input_el_filter);
		var fieldFilter = "";

		/* обработчик фильтра */

		input_el_filter.keyup(function(eventObject) {
			var filterName, fName ,table, tr, tdName;
			var idFilter= listElementID + "-filter-name";
			var idAlpha= listElementID + "-alpha";
			filterName = document.getElementById(idFilter);
			fName = filterName.value.toUpperCase();
            fieldFilter = fName;
			var classInnerTable = listElementID + "-innerTable";
			table = document.getElementsByClassName(classInnerTable);
			for (var j = 0; j < table.length; j++) {
				var e = table[j];
				tr = e.getElementsByTagName("tr");
				for (var i = 0; i < tr.length; i++) {
					tdName = tr[i].getElementsByTagName("td")[0];
					if (tdName) {
						if (tdName.innerText.toUpperCase().indexOf(fName) == 0) {
							tr[i].style.display = "";
						} else {
							tr[i].style.display = "none";
						}
					} else {
						tr[i].style.display = "none";
					}
				}
			}

			for (var k = 0; k < table.length; k++) {
				var textCurrentTable = table[k].innerText;
				var idAlphes = table[k].getAttribute("id").replace("-table-for", "");
				if(fieldFilter==""){
					document.getElementById(idAlphes).style.display = "";
                    //div_el_innerDiv.css("margin-top","0px");
				} else {
					document.getElementById(idAlphes).style.display = "none";
				}

				if(textCurrentTable != ""){
                    div_el_innerDiv.css("margin-top","-24px");
				} else {
                    //div_el_innerDiv.css("margin-top","0px");
				}
			}
		});

		/* генерация визуального отображения */

		div_el_box.width(weihtEL);
		div_el_box.height(heightEL);
		div_el_main_area.height(heightEL - h1_el_header.height() - 10);
		input_el_filter.width(weihtEL - 50);

		var selectorAlpha = "."+ listElementID + "-alpha";
		var selectorInnerTable = "."+ listElementID + "-innerTable";
		var selectorInnerTableTd = "."+ listElementID + "-innerTable td";
		var selectorSpanText = "."+ listElementID + "-innerText";

		$("*").css({
			"font-family": "Arial, Verdana, sans-serif"
		});

		h1_el_header.css({"height": "41px", "background-color": "rgba(111, 111, 111, 0.99)", "margin": "0", "font-weight": "normal",
			"font-size": "19pt", "text-align": "center", "color": "White", "padding-top": "4px", "border-bottom": "1px solid black"
		});

		input_el_filter.css({"background-position": "10px 10px", "background-repeat": "no-repeat", "font-size": "16px",
			"padding": "5px 20px 5px 20px", "border": "1px solid #ddd", "margin-bottom": "32px", "border-radius": "50px 50px 50px 50px"
		});

		$(selectorAlpha).css({
			"background-color": "rgb(78, 78, 78)", "font-family": "Arial", "opacity": "0.9", "font-size": "12pt",
			"font-weight": "Bold", "text-indent": "10px", "color": "White", "line-height": "24px", "height": "24px"
		});

		div_el_main_area.css({
			"overflow-y": "hidden", "padding": "0", "background": "White", "position": "relative"
		});

		div_el_box.css({
			"margin-left": "36px", "border": "1px solid black"
		});

		$(selectorSpanText).css({
			"color": "Black", "cursor": "default", "padding-left": "10px", "display": "block", "height": "20px",
			"overflow": "hidden", "font-size": "10pt", "text-shadow": "0 1px 0 #999"
		});

		$(selectorInnerTableTd).css({"border-top": "solid 1px #ddd", "height": "40px",
			"background-color": "rgb(246, 246, 246)", "overflow": "hidden"
		});

		$(selectorInnerTable).css({
			"width": "100%"
		});

		/* disable text  - убирает возможность выделить текст в списке */

		$.fn.disableTextSelect = function () {
			return this.each(function () {
				$(this).bind('mousedown.disableTextSelect', function () {
					return false;
				});
			});
		};

		$.fn.enableTextSelect = function () {
			return this.each(function () {
				$(this).unbind('mousedown.disableTextSelect');
			});
		};

		/* логика работы прокручиваемого списка */

		var difference = div_el_innerDiv.height() - div_el_main_area.height();
		var margintop = 0;
		var oldY = 0;
		var newY = 0;
		div_el_main_area.disableTextSelect();

		div_el_main_area.mousedown(function (e) {
			div_el_innerDiv.stop();
			oldY = e.pageY;
		});

		$(window).mouseup(function (e) {
			oldY = 0
			if (margintop > 0) {
				margintop = 0;
				div_el_innerDiv.animate({'marginTop': margintop})
			} else if (difference + margintop < 0) {
				margintop = -difference;
				div_el_innerDiv.animate({'marginTop': margintop})
			}
		}).mousemove(function (e) {
			if(fieldFilter=="") {
				if (oldY != 0) {
					newY = e.pageY;
					margintop = margintop + newY - oldY
					div_el_innerDiv.css({'marginTop': margintop});
					oldY = newY;
				}
				setHeaderPosition("#" + listElementID + "-innerDiv");
			}
		});

		function setHeaderPosition(innerDiv) {
			$(selectorAlpha, innerDiv).each(function (i) {
				var headW = $(this).width();
				var headH = $(this).height();
				var curHead = $(this);
				var curContent = $(this).next();
				var dif = curContent.position().top + curContent.height();

				if (curHead.position().top <= 0) {
					var top = dif > 0 ? 0 : dif;
                    curHead.css({position: 'absolute', top: top, width: headW});
                    curContent.css({marginTop: curHead.height()});
				}

				if (curContent.position().top >= headH
					|| (curHead.position().top <= 0 && curContent.position().top > 0)) {
                    curHead.css({position: 'inherit', width: 'auto'});
                    curContent.css({marginTop: 0});
				}
			});
		}
	});
}





