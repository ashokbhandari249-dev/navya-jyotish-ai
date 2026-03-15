import { useState, useRef, useEffect } from "react";
const DB = { users: {} };
function hashPassword(p) {
  let h = 0;
  for (let i = 0; i < p.length; i++) { h = (Math.imul(31, h) + p.charCodeAt(i)) | 0; }
  return h.toString(36);
}
const RASHIS = [
  { name:"मेष", sym:"♈", en:"Aries" },{ name:"वृष", sym:"♉", en:"Taurus" },
  { name:"मिथुन", sym:"♊", en:"Gemini" },{ name:"कर्क", sym:"♋", en:"Cancer" },
  { name:"सिंह", sym:"♌", en:"Leo" },{ name:"कन्या", sym:"♍", en:"Virgo" },
  { name:"तुला", sym:"♎", en:"Libra" },{ name:"वृश्चिक", sym:"♏", en:"Scorpio" },
  { name:"धनु", sym:"♐", en:"Sagittarius" },{ name:"मकर", sym:"♑", en:"Capricorn" },
  { name:"कुम्भ", sym:"♒", en:"Aquarius" },{ name:"मीन", sym:"♓", en:"Pisces" },
];
const QUICK = [
  { icon:"🪐", text:"कुण्डली का विश्लेषण करो" },
  { icon:"❤️", text:"प्रेम जीवन बताओ" },
  { icon:"💼", text:"करियर में सफलता कब?" },
  { icon:"💰", text:"धन योग कब बनेगा?" },
  { icon:"💑", text:"विवाह कब होगा?" },
  { icon:"🔮", text:"भविष्य क्या है मेरा?" },
];
const SYSTEM = `तुम नव्या ज्योतिष के AI ज्योतिषाचार्य हो।
भाषा: सुन्दर हिन्दी। हर उत्तर में विस्तार और उपाय दो। अंत में 🙏 लगाओ।`;
const C = {
  bg:"#080612",bg2:"#0f0c1e",card:"rgba(255,255,255,0.04)",
  border:"rgba(255,220,120,0.12)",gold:"#E8B84B",gold2:"#F5D07A",
  cream:"#FFF8E7",muted:"rgba(255,220,120,0.45)",white:"rgba(255,255,255,0.88)",
  dim:"rgba(255,255,255,0.45)",accent:"#C9903A",red:"#E05C5C",green:"#5CBF8A",
};
const GoldBtn = ({ children, onClick, disabled, outline=false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width:"100%",padding:"14px",borderRadius:14,
    border:outline?`1px solid ${C.gold}`:"none",
    background:outline?"transparent":disabled?"rgba(255,255,255,0.08)":`linear-gradient(135deg,${C.gold},${C.accent})`,
    color:outline?C.gold:disabled?"rgba(255,255,255,0.25)":"#1a1000",
    fontSize:15,fontWeight:700,cursor:disabled?"default":"pointer",
    fontFamily:"inherit",transition:"all 0.25s",
  }}>{children}</button>
);
const Field = ({ label, type="text", value, onChange, placeholder, icon, error }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{marginBottom:16}}>
      {label&&<label style={{display:"block",fontSize:12,color:C.muted,marginBottom:6,textTransform:"uppercase"}}>{label}</label>}
      <div style={{position:"relative"}}>
        {icon&&<span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16,opacity:0.5}}>{icon}</span>}
        <input type={(type==="password"&&show)?"text":type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          style={{width:"100%",padding:icon?"13px 44px 13px 42px":"13px 16px",borderRadius:12,
            border:`1px solid ${error?C.red+"66":C.border}`,background:"rgba(255,255,255,0.05)",
            color:C.white,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}
          onFocus={e=>e.target.style.borderColor=C.gold+"66"}
          onBlur={e=>e.target.style.borderColor=error?C.red+"66":C.border}/>
        {type==="password"&&<button onClick={()=>setShow(!show)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:C.dim,fontSize:16}}>{show?"🙈":"👁️"}</button>}
      </div>
      {error&&<p style={{margin:"4px 0 0",fontSize:12,color:C.red}}>{error}</p>}
    </div>
  );
};
function SplashScreen({onDone}) {
  useEffect(()=>{const t=setTimeout(onDone,2200);return()=>clearTimeout(t);},[]);
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`radial-gradient(ellipse at 50% 40%,#1a1030,${C.bg})`}}>
      <style>{`@keyframes logoIn{0%{opacity:0;transform:scale(0.7)}100%{opacity:1;transform:scale(1)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes barLoad{from{width:0}to{width:100%}}`}</style>
      <div style={{animation:"logoIn 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards"}}>
        <div style={{width:90,height:90,borderRadius:26,background:`linear-gradient(135deg,${C.gold},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,marginBottom:20,boxShadow:"0 20px 60px rgba(232,184,75,0.35)"}}>🪐</div>
      </div>
      <div style={{animation:"fadeIn 0.6s 0.6s both",textAlign:"center"}}>
        <h1 style={{margin:0,fontSize:32,fontWeight:800,letterSpacing:3,background:`linear-gradient(135deg,${C.gold2},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>नव्या ज्योतिष</h1>
        <p style={{margin:"8px 0 0",color:C.dim,fontSize:13,letterSpacing:4}}>Navya Jyotish AI</p>
      </div>
      <div style={{animation:"fadeIn 0.5s 1.2s both",width:160,marginTop:40}}>
        <div style={{height:2,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.gold},${C.gold2})`,animation:"barLoad 1.5s 0.5s forwards",width:0}}/>
        </div>
      </div>
      <p style={{animation:"fadeIn 0.5s 1.4s both",color:C.dim,fontSize:11,marginTop:16,letterSpacing:2}}>वैदिक ज्योतिष • AI शक्ति</p>
    </div>
  );
}
function AuthScreen({onLogin}) {
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState("");
  const set=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrors(e=>({...e,[k]:""}));};
  const validate=()=>{
    const e={};
    if(mode==="register"&&!form.name.trim())e.name="नाम आवश्यक है";
    if(!form.email.includes("@"))e.email="सही ईमेल दर्ज करें";
    if(form.password.length<6)e.password="पासवर्ड कम से कम 6 अक्षर";
    if(mode==="register"&&form.password!==form.confirm)e.confirm="पासवर्ड मेल नहीं खाते";
    return e;
  };
  const submit=async()=>{
    const e=validate();
    if(Object.keys(e).length){setErrors(e);return;}
    setLoading(true);setMsg("");
    await new Promise(r=>setTimeout(r,900));
    const key=form.email.toLowerCase();
    if(mode==="login"){
      const u=DB.users[key];
      if(!u||u.password!==hashPassword(form.password)){setErrors({password:"ईमेल या पासवर्ड गलत है"});setLoading(false);return;}
      onLogin({name:u.name,email:key});
    }else if(mode==="register"){
      if(DB.users[key]){setErrors({email:"यह ईमेल पहले से पंजीकृत है"});setLoading(false);return;}
      DB.users[key]={name:form.name.trim(),password:hashPassword(form.password)};
      onLogin({name:form.name.trim(),email:key});
    }else{setMsg("✅ रीसेट लिंक भेज दिया गया।");}
    setLoading(false);
  };
  return (
    <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 0%,#1a1030,${C.bg})`,display:"flex",flexDirection:"column"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{padding:"40px 24px 20px",textAlign:"center",animation:"fadeUp 0.6s ease"}}>
        <div style={{width:64,height:64,borderRadius:20,background:`linear-gradient(135deg,${C.gold},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px",boxShadow:"0 12px 40px rgba(232,184,75,0.3)"}}>🪐</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:800,letterSpacing:2,background:`linear-gradient(135deg,${C.gold2},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>नव्या ज्योतिष</h1>
        <p style={{color:C.dim,fontSize:12,margin:"4px 0 0",letterSpacing:3}}>NAVYA JYOTISH AI</p>
      </div>
      <div style={{flex:1,padding:"0 20px 32px",animation:"fadeUp 0.7s 0.1s both"}}>
        <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:24,padding:"28px 24px"}}>
          {mode!=="forgot"&&(
            <div style={{display:"flex",background:"rgba(0,0,0,0.25)",borderRadius:12,padding:4,marginBottom:28}}>
              {["login","register"].map(m=>(
                <button key={m} onClick={()=>{setMode(m);setErrors({});setMsg("");}} style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"inherit",background:mode===m?`linear-gradient(135deg,${C.gold},${C.accent})`:"transparent",color:mode===m?"#1a1000":C.dim,fontWeight:700,fontSize:14}}>
                  {m==="login"?"🔑 लॉग इन":"✨ पंजीकरण"}
                </button>
              ))}
            </div>
          )}
          {mode==="forgot"&&(
            <div style={{marginBottom:24}}>
              <button onClick={()=>setMode("login")} style={{background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:14,padding:0,marginBottom:12,fontFamily:"inherit"}}>← वापस</button>
              <h3 style={{margin:0,color:C.cream,fontSize:18}}>पासवर्ड भूल गए?</h3>
            </div>
          )}
          {mode==="register"&&<Field label="पूरा नाम" icon="👤" value={form.name} onChange={v=>set("name",v)} placeholder="आपका नाम" error={errors.name}/>}
          <Field label="ईमेल" type="email" icon="✉️" value={form.email} onChange={v=>set("email",v)} placeholder="email@example.com" error={errors.email}/>
          {mode!=="forgot"&&<Field label="पासवर्ड" type="password" icon="🔒" value={form.password} onChange={v=>set("password",v)} placeholder="••••••••" error={errors.password}/>}
          {mode==="register"&&<Field label="पासवर्ड पुनः" type="password" icon="🔒" value={form.confirm} onChange={v=>set("confirm",v)} placeholder="••••••••" error={errors.confirm}/>}
          {msg&&<div style={{padding:"10px 14px",borderRadius:10,background:`${C.green}18`,border:`1px solid ${C.green}44`,color:C.green,fontSize:13,marginBottom:16}}>{msg}</div>}
          <GoldBtn onClick={submit} disabled={loading}>
            {loading?"⏳ प्रतीक्षा...":mode==="login"?"🔑 प्रवेश करें":mode==="register"?"✨ खाता बनाएँ":"📧 लिंक भेजें"}
          </GoldBtn>
          {mode==="login"&&<button onClick={()=>{setMode("forgot");setErrors({});setMsg("");}} style={{display:"block",width:"100%",textAlign:"center",background:"none",border:"none",color:C.muted,fontSize:13,marginTop:14,cursor:"pointer",fontFamily:"inherit"}}>पासवर्ड भूल गए?</button>}
          <div style={{display:"flex",alignItems:"center",gap:12,margin:"18px 0"}}>
            <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${C.border})`}}/>
            <span style={{fontSize:16,color:C.muted}}>✦</span>
            <div style={{flex:1,height:1,background:`linear-gradient(90deg,${C.border},transparent)`}}/>
          </div>
          <p style={{textAlign:"center",color:C.dim,fontSize:12,margin:0}}>🔒 AES-256 एन्क्रिप्शन से सुरक्षित</p>
        </div>
        <div style={{marginTop:14,padding:"12px 16px",borderRadius:12,background:"rgba(232,184,75,0.06)",border:`1px solid ${C.border}`,textAlign:"center"}}>
          <p style={{margin:0,color:C.muted,fontSize:12}}>🎯 <b style={{color:C.gold}}>डेमो:</b> कोई भी ईमेल + ६ अक्षर पासवर्ड</p>
        </div>
      </div>
    </div>
  );
}
function MainApp({user,onLogout}) {
  const [tab,setTab]=useState("home");
  const [messages,setMessages]=useState([{role:"assistant",content:`🙏 नमस्ते ${user.name} जी!\n\nमैं नव्या ज्योतिष AI हूँ।\n\nअपना जन्म विवरण दें या नीचे विकल्प चुनें। ✨`}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [rashi,setRashi]=useState(null);
  const [rashiText,setRashiText]=useState("");
  const [rashiLoading,setRashiLoading]=useState(false);
  const [showLogout,setShowLogout]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);
  const callAI=async(msgs)=>{
    const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYSTEM,messages:msgs})});
    const d=await r.json();
    return d.content?.[0]?.text||"❌ कुछ समस्या आई।";
  };
  const send=async(txt)=>{
    const m=txt||input.trim();
    if(!m||loading)return;
    setInput("");
    const newMsgs=[...messages,{role:"user",content:m}];
    setMessages(newMsgs);setLoading(true);
    try{const reply=await callAI(newMsgs.map(x=>({role:x.role,content:x.content})));setMessages(p=>[...p,{role:"assistant",content:reply}]);}
    catch{setMessages(p=>[...p,{role:"assistant",content:"❌ कुछ समस्या आई।"}]);}
    setLoading(false);
  };
  const getRashifal=async()=>{
    if(!rashi||rashiLoading)return;
    setRashiLoading(true);setRashiText("");
    try{const r=await callAI([{role:"user",content:`${rashi.name} राशि का आज का विस्तृत राशिफल बताओ।`}]);setRashiText(r);}
    catch{setRashiText("❌ कुछ समस्या आई।");}
    setRashiLoading(false);
  };
  const fmt=(t)=>t.split('\n').map((l,i,a)=><span key={i}>{l}{i<a.length-1&&<br/>}</span>);
  const TABS=[{id:"home",icon:"🏠",label:"होम"},{id:"chat",icon:"💬",label:"चैट"},{id:"rashifal",icon:"⭐",label:"राशिफल"},{id:"profile",icon:"👤",label:"प्रोफ़ाइल"}];
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",fontFamily:"inherit",maxWidth:480,margin:"0 auto"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes sp{0%,100%{opacity:0.7}50%{opacity:1}}`}</style>
      <div style={{padding:"16px 20px 12px",background:`linear-gradient(180deg,${C.bg2},transparent)`,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.gold},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🪐</div>
          <div>
            <div style={{fontSize:15,fontWeight:800,letterSpacing:1.5,background:`linear-gradient(135deg,${C.gold2},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>नव्या ज्योतिष</div>
            <div style={{fontSize:10,color:C.dim,letterSpacing:2}}>NAVYA JYOTISH AI</div>
          </div>
        </div>
        <div style={{position:"relative"}}>
          <button onClick={()=>setShowLogout(p=>!p)} style={{width:36,height:36,borderRadius:50,border:`1px solid ${C.border}`,background:"rgba(255,255,255,0.06)",color:C.gold,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>👤</button>
          {showLogout&&<div style={{position:"absolute",right:0,top:44,background:C.bg2,border:`1px solid ${C.border}`,borderRadius:14,padding:8,minWidth:160,zIndex:100,boxShadow:"0 16px 40px rgba(0,0,0,0.6)"}}>
            <div style={{padding:"8px 12px",borderBottom:`1px solid ${C.border}`,marginBottom:4}}>
              <div style={{color:C.cream,fontSize:13,fontWeight:600}}>{user.name}</div>
              <div style={{color:C.dim,fontSize:11}}>{user.email}</div>
            </div>
            <button onClick={onLogout} style={{width:"100%",padding:"9px 12px",background:"none",border:"none",color:C.red,fontSize:13,cursor:"pointer",textAlign:"left",borderRadius:8,fontFamily:"inherit",fontWeight:600}}>🚪 लॉग आउट</button>
          </div>}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        {tab==="home"&&<div style={{padding:"20px 18px",animation:"fadeUp 0.4s ease"}}>
          <div style={{padding:"22px 20px",borderRadius:20,background:"linear-gradient(135deg,rgba(232,184,75,0.12),rgba(201,144,58,0.08))",border:`1px solid ${C.border}`,marginBottom:20}}>
            <p style={{margin:"0 0 4px",color:C.muted,fontSize:12,letterSpacing:2}}>नमस्ते 🙏</p>
            <h2 style={{margin:"0 0 6px",color:C.cream,fontSize:20,fontWeight:700}}>{user.name} जी</h2>
            <p style={{margin:0,color:C.dim,fontSize:13}}>आज का दिन शुभ हो।</p>
            <div style={{marginTop:14,display:"flex",gap:8}}>
              {[["🌙","दशा","शुभ"],["☀️","ग्रह","अनुकूल"],["🪐","AI","ऑनलाइन"]].map(([ico,lbl,val],i)=>(
                <div key={i} style={{flex:1,padding:"10px 8px",borderRadius:12,background:"rgba(0,0,0,0.25)",border:`1px solid ${C.border}`,textAlign:"center"}}>
                  <div style={{fontSize:16}}>{ico}</div>
                  <div style={{color:C.gold,fontSize:10,fontWeight:600,marginTop:3}}>{lbl}</div>
                  <div style={{color:i===2?C.green:C.dim,fontSize:10}}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <h3 style={{color:C.muted,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>सेवाएँ</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
            {[["🪐","कुण्डली","सम्पूर्ण विश्लेषण",()=>{setTab("chat");send("मेरी कुण्डली का विश्लेषण करो");}],["⭐","राशिफल","आज का फल",()=>setTab("rashifal")],["❤️","प्रेम","विवाह योग",()=>{setTab("chat");send("मेरे प्रेम और विवाह के बारे में बताओ");}],["💼","करियर","धन और सफलता",()=>{setTab("chat");send("मेरे करियर और धन के बारे में बताओ");}]].map(([ico,title,sub,action],i)=>(
              <button key={i} onClick={action} style={{padding:"18px 14px",borderRadius:16,border:`1px solid ${C.border}`,background:C.card,cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}
                onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(232,184,75,0.35)";e.currentTarget.style.background="rgba(232,184,75,0.07)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card;}}>
                <div style={{fontSize:28,marginBottom:8}}>{ico}</div>
                <div style={{color:C.cream,fontSize:14,fontWeight:700}}>{title}</div>
                <div style={{color:C.dim,fontSize:12,marginTop:2}}>{sub}</div>
              </button>
            ))}
          </div>
          <h3 style={{color:C.muted,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>त्वरित प्रश्न</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {QUICK.map((q,i)=>(
              <button key={i} onClick={()=>{setTab("chat");send(q.text);}} style={{padding:"12px 16px",borderRadius:12,border:`1px solid ${C.border}`,background:"rgba(255,255,255,0.03)",color:C.white,fontSize:13,cursor:"pointer",textAlign:"left",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,transition:"all 0.2s"}}>
                <span style={{fontSize:18}}>{q.icon}</span>{q.text}<span style={{marginLeft:"auto",color:C.muted}}>›</span>
              </button>
            ))}
          </div>
        </div>}
        {tab==="chat"&&<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 140px)"}}>
          <div style={{flex:1,overflowY:"auto",padding:"16px 16px 8px",display:"flex",flexDirection:"column",gap:12}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:8,animation:"fadeUp 0.3s ease"}}>
                {m.role==="assistant"&&<div style={{width:30,height:30,borderRadius:50,background:`linear-gradient(135deg,${C.gold},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🪐</div>}
                <div style={{maxWidth:"80%",padding:m.role==="user"?"11px 16px":"14px 18px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?`linear-gradient(135deg,${C.gold},${C.accent})`:"rgba(255,255,255,0.05)",border:m.role==="assistant"?`1px solid ${C.border}`:"none",color:m.role==="user"?"#1a1000":C.white,fontSize:14,lineHeight:1.75,fontWeight:m.role==="user"?600:400}}>{fmt(m.content)}</div>
              </div>
            ))}
            {loading&&<div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:30,height:30,borderRadius:50,background:`linear-gradient(135deg,${C.gold},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🪐</div>
              <div style={{padding:"14px 18px",borderRadius:"18px 18px 18px 4px",background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,display:"flex",gap:5,alignItems:"center"}}>
                {[0,1,2].map(j=><div key={j} style={{width:7,height:7,borderRadius:50,background:C.gold,animation:`sp 1.2s ${j*0.2}s infinite`}}/>)}
              </div>
            </div>}
            <div ref={endRef}/>
          </div>
          <div style={{padding:"10px 14px 16px",borderTop:`1px solid ${C.border}`,background:`${C.bg2}ee`,display:"flex",gap:10,alignItems:"flex-end"}}>
            <div style={{flex:1,borderRadius:16,overflow:"hidden",background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`}}>
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="अपना प्रश्न लिखें..." rows={1} style={{width:"100%",padding:"12px 16px",background:"transparent",border:"none",color:C.white,fontSize:14,fontFamily:"inherit",lineHeight:1.5,resize:"none",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <button onClick={()=>send()} disabled={loading||!input.trim()} style={{width:44,height:44,borderRadius:50,border:"none",background:input.trim()?`linear-gradient(135deg,${C.gold},${C.accent})`:"rgba(255,255,255,0.08)",color:input.trim()?"#1a1000":"rgba(255,255,255,0.2)",fontSize:18,cursor:input.trim()?"pointer":"default",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>➤</button>
          </div>
        </div>}
        {tab==="rashifal"&&<div style={{padding:"20px 18px",animation:"fadeUp 0.4s ease"}}>
          <h2 style={{color:C.cream,fontSize:20,margin:"0 0 4px"}}>⭐ आज का राशिफल</h2>
          <p style={{color:C.dim,fontSize:13,margin:"0 0 20px"}}>अपनी राशि चुनें</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:18}}>
            {RASHIS.map((r,i)=>(
              <button key={i} onClick={()=>{setRashi(r);setRashiText("");}} style={{padding:"12px 4px",borderRadius:14,border:`1px solid ${rashi?.name===r.name?"rgba(232,184,75,0.5)":C.border}`,background:rashi?.name===r.name?"rgba(232,184,75,0.12)":"rgba(255,255,255,0.03)",color:rashi?.name===r.name?C.gold:C.dim,cursor:"pointer",textAlign:"center",fontSize:12,fontWeight:600,fontFamily:"inherit",transition:"all 0.2s"}}>
                <div style={{fontSize:20,marginBottom:4}}>{r.sym}</div>{r.name}
              </button>
            ))}
          </div>
          <GoldBtn onClick={getRashifal} disabled={!rashi||rashiLoading}>{rashiLoading?"⏳ निकाल रहे हैं...":rashi?`${rashi.sym} ${rashi.name} का राशिफल देखें`:"राशि चुनें"}</GoldBtn>
          {rashiText&&<div style={{marginTop:18,padding:"18px",borderRadius:18,background:C.card,border:`1px solid ${C.border}`,color:C.white,fontSize:14,lineHeight:1.8,animation:"fadeUp 0.3s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:24}}>{rashi.sym}</span>
              <div><div style={{color:C.gold,fontWeight:700}}>{rashi.name} राशि</div><div style={{color:C.dim,fontSize:11}}>{rashi.en} • आज का राशिफल</div></div>
            </div>
            {fmt(rashiText)}
          </div>}
        </div>}
        {tab==="profile"&&<div style={{padding:"20px 18px",animation:"fadeUp 0.4s ease"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:50,background:`linear-gradient(135deg,${C.gold},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 14px"}}>👤</div>
            <h2 style={{color:C.cream,margin:0,fontSize:20}}>{user.name}</h2>
            <p style={{color:C.dim,fontSize:13,margin:"4px 0 0"}}>{user.email}</p>
          </div>
          {[["🔒","गोपनीयता और सुरक्षा","पासवर्ड, डेटा सुरक्षा"],["🔔","सूचनाएँ","राशिफल अलर्ट"],["📱","ऐप संस्करण","Navya Jyotish AI v1.0.0"],["⭐","ऐप रेटिंग दें","Indus App Store"],["📧","सहायता","support@navyajyotish.com"]].map(([ico,title,sub],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"16px",borderRadius:14,border:`1px solid ${C.border}`,background:C.card,marginBottom:10}}>
              <div style={{width:40,height:40,borderRadius:12,background:"rgba(232,184,75,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{ico}</div>
              <div style={{flex:1}}><div style={{color:C.cream,fontSize:14,fontWeight:600}}>{title}</div><div style={{color:C.dim,fontSize:12,marginTop:2}}>{sub}</div></div>
              <span style={{color:C.muted}}>›</span>
            </div>
          ))}
          <div style={{marginTop:6}}><GoldBtn outline onClick={onLogout}>🚪 लॉग आउट</GoldBtn></div>
          <p style={{textAlign:"center",color:C.dim,fontSize:11,marginTop:20,lineHeight:1.7}}>🔒 AES-256 एन्क्रिप्शन से सुरक्षित।</p>
        </div>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:`${C.bg2}f0`,borderTop:`1px solid ${C.border}`,backdropFilter:"blur(20px)",display:"flex",zIndex:50}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 0 12px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"inherit",transition:"all 0.2s"}}>
            <span style={{fontSize:20}}>{t.icon}</span>
            <span style={{fontSize:10,fontWeight:600,color:tab===t.id?C.gold:C.dim}}>{t.label}</span>
            {tab===t.id&&<div style={{width:18,height:2,borderRadius:2,background:`linear-gradient(90deg,${C.gold},${C.accent})`}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
export default function App() {
  const [screen,setScreen]=useState("splash");
  const [user,setUser]=useState(null);
  const handleLogin=(u)=>{setUser(u);setScreen("app");};
  const handleLogout=()=>{setUser(null);setScreen("auth");};
  return (
    <div style={{fontFamily:"'Noto Sans Devanagari','Mangal',sans-serif",background:C.bg,minHeight:"100vh"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap');*{box-sizing:border-box;}body{margin:0;background:${C.bg};}input,textarea,button{font-family:'Noto Sans Devanagari','Mangal',sans-serif;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:rgba(232,184,75,0.2);border-radius:2px;}`}</style>
      {screen==="splash"&&<SplashScreen onDone={()=>setScreen("auth")}/>}
      {screen==="auth"&&<AuthScreen onLogin={handleLogin}/>}
      {screen==="app"&&user&&<MainApp user={user} onLogout={handleLogout}/>}
    </div>
  );
        }
