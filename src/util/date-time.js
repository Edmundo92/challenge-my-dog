export function dateTime() {
    // Obtém a data/hora atual
    const data = new Date();

    // Guarda cada pedaço em uma variável
    const dia     = data.getDate();           // 1-31
    const dia_sem = data.getDay();            // 0-6 (zero=domingo)
    const mes     = data.getMonth();          // 0-11 (zero=janeiro)
    const ano4    = data.getFullYear();       // 4 dígitos
    const hora    = data.getHours();          // 0-23
    const min     = data.getMinutes();        // 0-59
    const seg     = data.getSeconds();        // 0-59

    const str_data = dia + '/' + (mes+1) + '/' + ano4;
    const str_hora = hora + ':' + min + ':' + seg;
    
    return {
        data: str_data,
        hora: str_hora,
        dia_sem
    }
}