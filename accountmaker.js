(async () => {
  window.tri = window.tri || {
    H: { 'Accept': 'application/json', 'authorization': triangulet.tokenraw, 'Content-Type': 'application/json' },
    B: 'https://tri.pengpowers.xyz',
    q: async (u, o = {}) => {
      try {
        const r = await fetch(u.startsWith('http') ? u : `${window.tri.B}${u}`, {
          method: o.m || 'GET',
          headers: { ...window.tri.H, ...o.h },
          body: o.b ? JSON.stringify(o.b) : undefined
        });
        return { s: r.status, d: await r.json().catch(() => ({})) }
      } catch (e) { return { s: 500, d: { error: e.message } } }
    }
  };
  const { q } = window.tri;
  const prefix = window.prompt("Account prefix:", "CatBot_") || "CatBot_";
  const count = parseInt(window.prompt("Quantity:", "10")) || 1;
  const pass = window.prompt("Password:", "il0veallcats_is_the_best_hacker") || "password123";
  console.log(`%cMaking ${count} accounts...`, 'color: #50A747; font-weight: bold');
  for (let i = 0; i < count; i++) {
    const name = `${prefix}${(i + 1)}`;
    const r = await q('/api/register', { m: 'POST', b: { username: name, password: pass } });
    if (r.s === 200) {
      console.log(`%c Created: ${name}`, 'color: #50A747');
    } else {
      const reason = r.d.message || r.d.error || (r.s === 500 ? "Internal Server Error (Server Crashed)" : `Status ${r.s}`);
      console.error(`%c Error failed to create ${name}: ${reason}`, 'color: #ff4444; font-weight: bold');
      if (r.s === 500) console.dir(r.d);
    }
  }
})();
