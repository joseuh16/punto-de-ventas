window.pdvDescargarXlsx = async function (url, nombre) {
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            alert('No se pudo generar el archivo de Excel.');
            return;
        }
        const blob = await resp.blob();
        let nombreArchivo = nombre || 'exportacion.xlsx';
        const cd = resp.headers.get('Content-Disposition') || '';
        const m = cd.match(/filename\*=UTF-8''([^;]+)/) || cd.match(/filename="?([^";]+)"?/);
        if (m) nombreArchivo = decodeURIComponent(m[1]);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
    } catch (err) {
        alert('Error al descargar el archivo.');
    }
};