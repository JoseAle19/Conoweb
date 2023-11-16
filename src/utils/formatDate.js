export const formatDate = (date) => {
    // Fecha en formato original

// Crear un objeto de fecha a partir de la cadena original
var fecha = new Date(date);

// Obtener los componentes de la fecha (año, mes, día, hora, minutos, segundos)
var año = fecha.getFullYear();
var mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
var dia = fecha.getDate().toString().padStart(2, '0');
var hora = fecha.getHours().toString().padStart(2, '0');
var minutos = fecha.getMinutes().toString().padStart(2, '0');
var segundos = fecha.getSeconds().toString().padStart(2, '0');

// Formatear la fecha como desees
var fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

return fechaFormateada;
}