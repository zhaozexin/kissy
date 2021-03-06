describe('web.js', function() {

    var S = KISSY,
        host = S.__HOST,
        fn = function() {
        };


    it('S.isWindow', function() {
        expect(S.isWindow(host)).toBe(true);
        expect(S.isWindow({})).toBe(false);
        expect(S.isWindow(document)).toBe(false);
        expect(S.isWindow(document.documentElement.firstChild)).toBe(false);
    });

    it('S.globalEval', function() {
        S.globalEval('var globalEvalTest = 1;');
        expect(host['globalEvalTest']).toBe(1);
    });

    it('S.later', function() {
        var ok = false;

        S.later(function(data) {
            ok = true;
            expect(data.n).toBe(1);
        }, 20, false, null, { n: 1 });

        waitsFor(function() {
            return ok;
        });
        ok = false;

        var i = 1;
        var timer = S.later(function(data) {
            expect(data.n).toBe(1);
            if (i++ === 3) {
                timer.cancel();
                ok = true;
            }
        }, 500, true, null, { n: 1 });

        waitsFor(function() {
            return ok;
        });
        ok = false;
    });

    it('S.ready', function() {

    });

    it('S.available', function() {
        var ret, t;

        t = document.createElement('DIV');
        t.id = 'test-available';
        document.body.appendChild(t);

        ret = 0;
        S.available('#test-available', function() {
            ret = 1;
        });
        expect(ret).toBe(0);

        S.later(function() {
            t = document.createElement('DIV');
            t.id = 'test-available2';
            document.body.appendChild(t);
        }, 100);

        ret = 0;
        S.available('test-available2', function() {
            ret = 1;
        });
        expect(ret).toBe(0);

        // 下面的语句不抛异常
        S.available();
        S.available('xxx');
    });
});
