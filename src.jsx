import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, Search, UserRound, Wallet, Trophy, History, ShieldCheck, ChevronRight, Sparkles, CircleDollarSign, Gamepad2 } from 'lucide-react';
import './style.css';

const categories = [
  ['All Games','✦'],['Slots (স্লট)','🎰'],['Fishing (ফিশিং)','🐠'],['Sports (স্পোর্টস)','⚽'],
  ['E-Sports (ই-স্পোর্টস)','🎮'],['Live Casino (লাইভ)','♠'],['Lottery (লটারি)','🎟'],['Poker (পোকার)','🂡']
];
const providers = ['JILI','SPB','PG','JDB','VG','FC','BNG','PP','MG','NS','BT','SG','SS','YB','PS','AMG','FS','WD','GM','5G','BOA','KA','L22','VA','HS','JK'];
const games = [
  {name:'Golden Fortune',provider:'JILI',category:'Slots (স্লট)',emoji:'🪙',color:'amber'},
  {name:'Ocean Catch',provider:'JILI',category:'Fishing (ফিশিং)',emoji:'🐠',color:'blue'},
  {name:'Dragon Treasure',provider:'PG',category:'Slots (স্লট)',emoji:'🐉',color:'red'},
  {name:'Lucky Kick',provider:'SPB',category:'Sports (স্পোর্টস)',emoji:'⚽',color:'green'},
  {name:'Neon Arena',provider:'FC',category:'E-Sports (ই-স্পোর্টস)',emoji:'🎮',color:'purple'},
  {name:'Royal Table',provider:'MG',category:'Live Casino (লাইভ)',emoji:'♠️',color:'red'},
  {name:'Lucky Draw',provider:'JDB',category:'Lottery (লটারি)',emoji:'🎟️',color:'purple'},
  {name:'Poker Nights',provider:'PP',category:'Poker (পোকার)',emoji:'🂡',color:'blue'},
  {name:'Moonlight Spins',provider:'BNG',category:'Slots (স্লট)',emoji:'🌙',color:'purple'},
  {name:'Deep Sea Gold',provider:'YB',category:'Fishing (ফিশিং)',emoji:'🦈',color:'blue'},
  {name:'Champions Cup',provider:'SS',category:'Sports (স্পোর্টস)',emoji:'🏆',color:'green'},
  {name:'Emerald Rush',provider:'NS',category:'Slots (স্লট)',emoji:'💎',color:'green'}
];
function App(){
  const [category,setCategory] = useState('All Games');
  const [provider,setProvider] = useState('All Providers');
  const [view,setView] = useState('Lobby');
  const [auth,setAuth] = useState('');
  const [logged,setLogged] = useState(false);
  const [user,setUser] = useState('Guest');
  const [mobileNav,setMobileNav] = useState(false);
  const [balance,setBalance] = useState(0);
  const [transactions,setTransactions] = useState([]);
  const [notice,setNotice] = useState('');
  const [method,setMethod] = useState('bKash');
  const [deposit,setDeposit] = useState({amount:'',txn:'',sender:''});
  const [withdraw,setWithdraw] = useState({amount:'',number:''});
  const [admin,setAdmin] = useState(false);
  const shown = games.filter(g => (category==='All Games'||g.category===category) && (provider==='All Providers'||g.provider===provider));
  function notify(s){setNotice(s);setTimeout(()=>setNotice(''),3200)}
  function submitDeposit(e){e.preventDefault(); if(!deposit.amount||!deposit.txn||!deposit.sender)return notify('সব তথ্য পূরণ করুন।'); setTransactions([{type:'Deposit',method,amount:Number(deposit.amount),status:'Pending review',ref:deposit.txn},...transactions]); setDeposit({amount:'',txn:'',sender:''}); notify('Demo request submitted — কোনো টাকা স্থানান্তর হয়নি।');setView('Wallet');}
  function submitWithdraw(e){e.preventDefault(); if(!withdraw.amount||!withdraw.number)return notify('সব তথ্য পূরণ করুন।');setTransactions([{type:'Withdraw',method,amount:Number(withdraw.amount),status:'Pending review',ref:withdraw.number},...transactions]);setWithdraw({amount:'',number:''});notify('Demo withdrawal request submitted.');setView('Wallet');}
  function login(e){e.preventDefault();let fd=new FormData(e.currentTarget);setUser(fd.get('username')||'Lucky Player');setLogged(true);setAuth('');notify('Demo account session started.');}
  return <div className="app">
    <header className="topbar">
      <button className="iconbtn mobile-menu" onClick={()=>setMobileNav(!mobileNav)} aria-label="Menu">{mobileNav?<X/>:<Menu/>}</button>
      <button className="brand" onClick={()=>setView('Lobby')}><span className="brand-mark">L</span><span>lucky <b>win</b><small>PLAY LOUNGE</small></span></button>
      <div className="search"><Search size={17}/><input placeholder="Search games or providers..." onChange={e=>{const v=e.target.value.toLowerCase();setCategory('All Games');setProvider(providers.find(p=>p.toLowerCase()===v)||'All Providers');}}/></div>
      <div className="head-actions"><button className="balance" onClick={()=>setView('Wallet')}><Wallet size={16}/> ৳{balance.toLocaleString('en-BD')}</button>{logged?<button className="profile" onClick={()=>setView('Profile')}><UserRound size={17}/>{user}</button>:<button className="gold-btn" onClick={()=>setAuth('signin')}>Sign In</button>}<button className="outline-btn" onClick={()=>setAuth('signup')}>Join Now</button></div>
    </header>
    <div className="layout">
      <aside className={`sidebar ${mobileNav?'open':''}`}>
        <div className="side-label">MAIN MENU</div>
        {[['Lobby',Gamepad2],['Wallet',Wallet],['Transactions',History],['Profile',UserRound],['Admin Blueprint',ShieldCheck]].map(([label,Icon])=><button key={label} className={`nav-item ${view===label?'active':''}`} onClick={()=>{setView(label);setMobileNav(false)}}><Icon size={18}/><span>{label}</span>{label==='Wallet'&&<span className="nav-dot"/>}</button>)}
        <div className="side-label category-label">GAME CATEGORIES</div>
        {categories.map(([label,emoji])=><button key={label} className={`nav-item ${category===label?'active':''}`} onClick={()=>{setCategory(label);setView('Lobby');setMobileNav(false)}}><span className="cat-emoji">{emoji}</span><span>{label}</span></button>)}
        <div className="side-promo"><Sparkles size={19}/><b>Good luck starts here</b><span>Explore the demo lobby</span></div>
      </aside>
      <main className="main">
        {view==='Lobby'&&<><section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="pulse"/> THE LUCKY LOUNGE</div><h1>Your next <em>lucky</em><br/>moment starts here.</h1><p>Explore the lobby, discover new favorites, and enjoy the experience.</p><div className="hero-buttons"><button className="gold-btn" onClick={()=>document.getElementById('game-lobby').scrollIntoView({behavior:'smooth'})}>Explore Games <ChevronRight size={17}/></button><button className="ghost-btn" onClick={()=>setView('Wallet')}>My Wallet</button></div><div className="hero-stats"><span><b>26+</b><small>PROVIDER LABELS</small></span><span><b>7</b><small>CATEGORIES</small></span><span><b>24/7</b><small>LOBBY ACCESS</small></span></div></div><div className="hero-art"><div className="halo"></div><div className="coin coin-one">L</div><div className="coin coin-two">✦</div><div className="jackpot">LUCKY<br/><strong>WIN</strong><small>YOUR PLAY LOUNGE</small></div><div className="spark s1">✦</div><div className="spark s2">✧</div></div><div className="hero-disclaimer">DEMO EXPERIENCE · NO REAL-MONEY PLAY</div></section>
        <section className="quick-row"><div><span className="quick-icon"><Trophy/></span><span><b>Game Lobby</b><small>Explore demo titles</small></span></div><div><span className="quick-icon"><CircleDollarSign/></span><span><b>Wallet Center</b><small>Simulated requests</small></span></div><div><span className="quick-icon"><ShieldCheck/></span><span><b>Secure by design</b><small>Production review needed</small></span></div></section>
        <section id="game-lobby" className="game-section"><div className="section-head"><div><div className="eyebrow">FIND YOUR FAVORITE</div><h2>{category==='All Games'?'Popular games':category}</h2></div><span className="result-count">{shown.length} DEMO TITLES</span></div>
        <div className="category-chips">{categories.map(([label])=><button key={label} onClick={()=>setCategory(label)} className={category===label?'selected':''}>{label}</button>)}</div>
        <div className="provider-wrap"><span>PROVIDERS</span><div className="provider-list"><button className={provider==='All Providers'?'provider-active':''} onClick={()=>setProvider('All Providers')}>ALL</button>{providers.map(p=><button key={p} className={provider===p?'provider-active':''} onClick={()=>setProvider(p)}>{p}</button>)}</div></div>
        <div className="game-grid">{shown.map((g,i)=><article className={`game-card ${g.color}`} key={g.name}><div className="game-visual"><span className="game-badge">{g.provider}</span><span className="game-emoji">{g.emoji}</span><span className="game-orbit"></span><button className="play-btn" onClick={()=>notify('Demo only: no game provider is connected.')}>View Game <ChevronRight size={15}/></button></div><div className="game-info"><div><b>{g.name}</b><small>{g.provider} · {g.category.split(' (')[0]}</small></div><span className="star">✦</span></div></article>)}</div>
        {shown.length===0&&<div className="empty">No demo titles in this filter yet. Try another provider.</div>}
        <div className="provider-directory"><div><h3>Provider directory</h3><p>Provider names are labels only; no provider APIs are connected.</p></div><div className="directory-grid">{providers.map(p=><button key={p} onClick={()=>{setProvider(p);setCategory('All Games')}}>{p}<ChevronRight size={13}/></button>)}</div></div>
        </section></>}
        {view==='Wallet'&&<section className="page-panel"><div className="eyebrow">ACCOUNT CENTER</div><h1>Wallet <em>Center</em></h1><p className="muted">All requests below are simulated. No money is transferred.</p><div className="wallet-balance"><span>DEMO BALANCE</span><strong>৳{balance.toLocaleString('en-BD')}</strong><small>Real-money payments are disabled</small></div><div className="form-grid"><form className="form-card" onSubmit={submitDeposit}><h3>Deposit request</h3><p>Payment type: <b>Send Money (সেন্ডমানি)</b></p><label>Payment method</label><div className="method-row">{['bKash','Nagad','Rocket'].map(m=><button type="button" key={m} className={method===m?'method selected':'method'} onClick={()=>setMethod(m)}>{m}</button>)}</div><label>Demo deposit number</label><div className="number-box"><strong>01321685066</strong><button type="button" onClick={()=>{navigator.clipboard?.writeText('01321685066');notify('Number copied if clipboard access is available.')}}>Copy</button></div><small className="warning">User-supplied number — verify authorization before any live use.</small><label>Deposit amount (BDT)</label><input type="number" min="1" value={deposit.amount} onChange={e=>setDeposit({...deposit,amount:e.target.value})} placeholder="Enter amount" required/><label>Sender phone number</label><input value={deposit.sender} onChange={e=>setDeposit({...deposit,sender:e.target.value})} placeholder="01XXXXXXXXX" required/><label>Transaction ID (TxnID)</label><input value={deposit.txn} onChange={e=>setDeposit({...deposit,txn:e.target.value})} placeholder="Enter transaction ID" required/><button className="gold-btn submit-btn">Submit demo request</button></form>
        <form className="form-card" onSubmit={submitWithdraw}><h3>Withdraw request</h3><p>Request a simulated payout to your personal wallet.</p><label>Withdrawal method</label><div className="method-row">{['bKash','Nagad','Rocket'].map(m=><button type="button" key={m} className={method===m?'method selected':'method'} onClick={()=>setMethod(m)}>{m}</button>)}</div><label>Personal wallet number</label><input value={withdraw.number} onChange={e=>setWithdraw({...withdraw,number:e.target.value})} placeholder="01XXXXXXXXX" required/><label>Withdrawal amount (BDT)</label><input type="number" min="1" value={withdraw.amount} onChange={e=>setWithdraw({...withdraw,amount:e.target.value})} placeholder="Enter amount" required/><button className="gold-btn submit-btn">Submit demo withdrawal</button></form></div></section>}
        {view==='Transactions'&&<section className="page-panel"><div className="eyebrow">ACCOUNT ACTIVITY</div><h1>Transaction <em>History</em></h1><div className="table-wrap"><table><thead><tr><th>Type</th><th>Method</th><th>Amount</th><th>Reference</th><th>Status</th></tr></thead><tbody>{transactions.map((t,i)=><tr key={i}><td>{t.type}</td><td>{t.method}</td><td>৳{Number(t.amount).toLocaleString('en-BD')}</td><td>{t.ref}</td><td><span className="status">{t.status}</span></td></tr>)}</tbody></table>{transactions.length===0&&<div className="empty">No demo transactions yet.</div>}</div></section>}
        {view==='Profile'&&<section className="page-panel"><div className="eyebrow">YOUR ACCOUNT</div><h1>Profile <em>Settings</em></h1><div className="form-card profile-card"><div className="avatar"><UserRound size={30}/></div><h3>{logged?user:'Guest Player'}</h3><p className="muted">{logged?'Demo session active':'Sign in to start a demo session'}</p><button className="gold-btn" onClick={()=>logged?(setLogged(false),setUser('Guest'),notify('Signed out of demo session.')):setAuth('signin')}>{logged?'Sign Out':'Sign In'}</button></div></section>}
        {view==='Admin Blueprint'&&<section className="page-panel"><div className="eyebrow">ADMIN CONCEPT</div><h1>Admin <em>Blueprint</em></h1><p className="muted">Sample-only dashboard. It does not approve real payments or access real registered users.</p><div className="admin-cards"><div><span>Pending deposits</span><b>{transactions.filter(t=>t.type==='Deposit'&&t.status==='Pending review').length}</b></div><div><span>Pending withdrawals</span><b>{transactions.filter(t=>t.type==='Withdraw'&&t.status==='Pending review').length}</b></div><div><span>Demo accounts</span><b>{logged?'1':'0'}</b></div></div><div className="table-wrap"><table><thead><tr><th>Type</th><th>Method</th><th>Amount</th><th>Status</th><th>Demo action</th></tr></thead><tbody>{transactions.map((t,i)=><tr key={i}><td>{t.type}</td><td>{t.method}</td><td>৳{t.amount}</td><td>{t.status}</td><td><button className="small-action" onClick={()=>{setTransactions(transactions.map((x,j)=>j===i?{...x,status:'Rejected (demo)'}:x));notify('Demo status updated. Balance was not changed.')}}>Reject</button></td></tr>)}</tbody></table>{transactions.length===0&&<div className="empty">No sample requests to review.</div>}</div></section>}
        <footer><span className="brand mini"><span className="brand-mark">L</span><span>lucky <b>win</b></span></span><span>© 2026 lucky win · Demo prototype</span><span>Play responsibly · 18+ only where lawful</span></footer>
      </main>
    </div>
    {notice&&<div className="toast">{notice}</div>}
    {auth&&<div className="modal-backdrop" onClick={()=>setAuth('')}><form className="auth-modal" onSubmit={login} onClick={e=>e.stopPropagation()}><button type="button" className="modal-close" onClick={()=>setAuth('')}><X/></button><div className="brand modal-brand"><span className="brand-mark">L</span><span>lucky <b>win</b><small>PLAY LOUNGE</small></span></div><h2>{auth==='signup'?'Create your account':'Welcome back'}</h2><p className="muted">Demo-only authentication. Do not use a real password.</p>{auth==='signup'&&<><label>Phone number</label><input name="phone" placeholder="01XXXXXXXXX" required/></>}<label>Username</label><input name="username" placeholder="Choose a username" required/><label>Password</label><input name="password" type="password" placeholder="Demo password" required/>{auth==='signup'&&<><label>Confirm password</label><input name="confirm" type="password" placeholder="Repeat password" required/><label>Currency</label><select name="currency"><option>BDT — Bangladeshi Taka</option><option>USD — US Dollar</option></select></>}<button className="gold-btn submit-btn">{auth==='signup'?'Create demo account':'Sign in to demo'}</button><p className="switch-auth">{auth==='signup'?'Already have an account?':'New here?'} <button type="button" onClick={()=>setAuth(auth==='signup'?'signin':'signup')}>{auth==='signup'?'Sign In':'Join Now'}</button></p></form></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
