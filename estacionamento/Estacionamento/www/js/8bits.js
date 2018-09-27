function imprimir(){
			var numero = document.getElementById("numeroImpresso").value;
			numero = parseInt(numero);
			var numeroF = document.getElementById("numeroImpressoF").value;
			numeroF = parseInt(numeroF);
			var cor = "#ddd";
			var binario = "";
			var array1 = [];
			var osilacao1 = 0;
			var array2 = [];
			var osilacao2 = 0;
			var array3 = [];
			var osilacao3 = 0;
			var array4 = [];
			var osilacao4 = 0;
			var array5 = [];
			var osilacao5 = 0;
			var array6 = [];
			var osilacao6 = 0;
			var array7 = [];
			var osilacao7 = 0;
			var array8 = [];
			var osilacao8 = 0;
			var numaroBinario = "";

			binario  = "<br><br><table class='table'>";
			binario += 		"<tr bgcolor='lightblue'>";
			binario += 			"<td align='center'>Decimal</td>";
			binario += 			"<td align='center'>Binario</td>";
			binario += 			"</tr>";

			for (var i = 0; i <= numeroF; i++) {
				if (array1.length == 0 ) {
					array1.push(0); osilacao1++;
					array2.push(0); osilacao2++;
					array3.push(0); osilacao3++;
					array4.push(0); osilacao4++;
					array5.push(0); osilacao5++;
					array6.push(0); osilacao6++;
					array7.push(0); osilacao7++;
					array8.push(0); osilacao8++;
				}
				else {
					if (array1[array1.length-1] == 0 || array1[array1.length-1] == "0") array1.push(1);
					else array1.push(0);
					



					if (osilacao2 == Math.pow(2, 1)) {
						osilacao2 = 1;
						if (array2[array2.length-1] == 0 || array2[array2.length-1] == "0") array2.push(1);
						else array2.push(0);
					}
					else {
						osilacao2++;
						array2.push(array2[array2.length - 1]);
					}



					if (osilacao3 == Math.pow(2, 2)) {
						osilacao3 = 1;
						if (array3[array3.length-1] == 0 || array3[array3.length-1] == "0") array3.push(1);
						else array3.push(0);
					}
					else {
						osilacao3++;
						array3.push(array3[array3.length - 1]);
					}



					if (osilacao4 == Math.pow(2, 3)) {
						osilacao4 = 1;
						if (array4[array4.length-1] == 0 || array4[array4.length-1] == "0") array4.push(1);
						else array4.push(0);
					}
					else {
						osilacao4++;
						array4.push(array4[array4.length - 1]);
					}



					if (osilacao5 == Math.pow(2, 4)) {
						osilacao5 = 1;
						if (array5[array5.length-1] == 0 || array5[array5.length-1] == "0") array5.push(1);
						else array5.push(0);
					}
					else {
						osilacao5++;
						array5.push(array5[array5.length - 1]);
					}



					if (osilacao6 == Math.pow(2, 5)) {
						osilacao6 = 1;
						if (array6[array6.length-1] == 0 || array6[array6.length-1] == "0") array6.push(1);
						else array6.push(0);
					}
					else {
						osilacao6++;
						array6.push(array6[array6.length - 1]);
					}



					if (osilacao7 == Math.pow(2, 6)) {
						osilacao7 = 1;
						if (array7[array7.length-1] == 0 || array7[array7.length-1] == "0") array7.push(1);
						else array7.push(0);
					}
					else {
						osilacao7++;
						array7.push(array7[array7.length - 1]);
					}



					if (osilacao8 == Math.pow(2, 7)) {
						osilacao8 = 1;
						if (array8[array8.length-1] == 0 || array8[array8.length-1] == "0") array8.push(1);
						else array8.push(0);
					}
					else {
						osilacao8++;
						array8.push(array8[array8.length - 1]);
					}
				}
				if (numero <= i) {
					if (cor == "#ddd") {
						cor = "#aaa";
					}
					else {
						cor = "#ddd";
					}
					binario += "<tr bgcolor='"+cor+"'>";
					binario += 		"<td align='center'>"+i+"</td>";
					binario += 		"<td align='center'>"+array8[i]+array7[i]+array6[i]+array5[i]+array4[i]+array3[i]+array2[i]+array1[i]+"</td>";
					binario += "</tr>";
				}
				
			}
			binario += "</table>";
			document.getElementById("binario").innerHTML = binario;
		}