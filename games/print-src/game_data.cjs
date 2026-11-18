// Prints the question arrays of a game page as JSON: node game_data.cjs games/jawib/index.html Q W DIA
const fs=require('fs');const s=fs.readFileSync(process.argv[2],'utf8');const out={};
for(const n of process.argv.slice(3)){const m=s.match(new RegExp('const '+n+'\\s*=\\s*(\\[[\\s\\S]*?\\]);'));if(m)out[n]=eval(m[1]);}
process.stdout.write(JSON.stringify(out));
