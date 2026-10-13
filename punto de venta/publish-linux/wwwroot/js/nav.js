window.pdvNavGruposGuardar = function (map) {
    try { localStorage.setItem('pdvNavGrupos', JSON.stringify(map)); } catch (e) { }
};

window.pdvNavGruposLeer = function () {
    try { return JSON.parse(localStorage.getItem('pdvNavGrupos') || '{}'); } catch (e) { return {}; }
};

window.pdvEnfocar = function (el) {
    if (el) {
        el.focus();
        if (typeof el.select === 'function') el.select();
    }
};

window.pdvAsideGuardar = function (v) {
    try { localStorage.setItem('pdvAsideColapsado', v ? '1' : '0'); } catch (e) { }
};

window.pdvAsideLeer = function () {
    try { return localStorage.getItem('pdvAsideColapsado') === '1'; } catch (e) { return false; }
};

window.pdvCompactoGuardar = function (v) {
    try { localStorage.setItem('pdvMenuCompacto', v ? '1' : '0'); } catch (e) { }
};

window.pdvCompactoLeer = function () {
    try { return localStorage.getItem('pdvMenuCompacto') === '1'; } catch (e) { return false; }
};
(function () {
    if (typeof document === 'undefined' || !window.matchMedia || !window.matchMedia('(hover: hover)').matches) {
        return;
    }

    var caja = null;
    var actual = null;
    var timer = null;

    function obtenerCaja() {
        if (!caja) {
            caja = document.createElement('div');
            caja.className = 'pdv-tooltip';
            caja.setAttribute('role', 'tooltip');
            document.body.appendChild(caja);
        }
        return caja;
    }

    function ocultar() {
        clearTimeout(timer);
        timer = null;
        actual = null;
        if (caja) caja.classList.remove('visible');
    }

    function mostrar(texto, objetivo) {
        var box = obtenerCaja();
        box.textContent = texto;
        box.classList.remove('visible');

        var r = objetivo.getBoundingClientRect();
        var w = box.offsetWidth;
        var h = box.offsetHeight;
        var left = r.right + 10;
        var top = r.top + r.height / 2;

        if (left + w > window.innerWidth - 8) left = Math.max(8, r.left - w - 10);
        if (top + h / 2 > window.innerHeight - 8) top = window.innerHeight - 8 - h / 2;
        if (top - h / 2 < 8) top = 8 + h / 2;

        box.style.left = left + 'px';
        box.style.top = top + 'px';
        requestAnimationFrame(function () { box.classList.add('visible'); });
    }

    function elemento(e) {
        var t = e.target;
        return t && t.closest ? t.closest('[data-tip]') : null;
    }

    document.addEventListener('mouseover', function (e) {
        var el = elemento(e);
        if (el === actual) return;
        ocultar();
        if (!el) return;
        var texto = el.getAttribute('data-tip');
        if (!texto) return;
        actual = el;
        timer = setTimeout(function () { mostrar(texto, el); }, 100);
    });

    document.addEventListener('mouseout', function (e) {
        var desde = elemento(e);
        if (!desde) return;
        var hacia = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('[data-tip]') : null;
        if (hacia === desde) return;
        ocultar();
    });

    document.addEventListener('mousedown', ocultar);
    window.addEventListener('scroll', ocultar, true);
})();
