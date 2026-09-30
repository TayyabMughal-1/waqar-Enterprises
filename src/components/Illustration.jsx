import { useId } from "react";

// Shaded vector scenes, one per service category (key from data/services.js).
// Used as placeholders until real photos are added. Drawn on a 400×300 canvas;
// the main subject stays inside x 70–330 / y 35–265 so it survives cropping.

const range = (from, to, step) => {
  const out = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
};

const IRON = "#1c232c";

function Defs({ id }) {
  const lin = (name, stops, x2 = 0, y2 = 1) => (
    <linearGradient id={id + name} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c, op = 1]) => (
        <stop key={o} offset={o} stopColor={c} stopOpacity={op} />
      ))}
    </linearGradient>
  );
  return (
    <defs>
      {lin("sky", [[0, "#cfe0f3"], [1, "#f4f8fc"]])}
      {lin("wall", [[0, "#f2ede4"], [1, "#e1d9ca"]])}
      {lin("ground", [[0, "#d3cbbc"], [1, "#b2aa9b"]])}
      {lin("floor", [[0, "#dcd8d1"], [1, "#b9b4ab"]])}
      {lin("iron", [[0, "#465061"], [0.5, "#2a323d"], [1, "#12171d"]], 1, 0)}
      {lin("steel", [[0, "#86919d"], [0.45, "#e8edf2"], [1, "#7a8591"]], 1, 0)}
      {lin("steelv", [[0, "#e6ebf0"], [1, "#8c97a3"]])}
      {lin("alu", [[0, "#b3bac3"], [0.5, "#f5f7f9"], [1, "#a0a8b1"]], 1, 0)}
      {lin("aluv", [[0, "#f0f3f6"], [1, "#b1b9c2"]])}
      {lin("glass", [[0, "#d8ecf8", 0.7], [1, "#8db6d4", 0.5]], 1, 1)}
      {lin("gold", [[0, "#f8d77e"], [1, "#b37f28"]])}
      {lin("slat", [[0, "#e4e8ec"], [1, "#98a1ab"]])}
      {lin("dark", [[0, "#3a424c"], [1, "#1b2027"]])}
      {lin("green", [[0, "#a7d494"], [1, "#4c8747"]])}
      {lin("sheet", [[0, "#a9cde6", 0.85], [1, "#6c9dc1", 0.7]])}
      {lin("box", [[0, "#d9b27a"], [1, "#b98d55"]])}
      {lin("car", [[0, "#48586b"], [1, "#222b36"]])}
      <filter id={id + "blur"} x="-30%" y="-100%" width="160%" height="300%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
  );
}

/* ---------- shared scenery ---------- */

function Outdoor({ f }) {
  return (
    <>
      <rect width="400" height="300" fill={f("sky")} />
      <g fill="#fff" opacity="0.85">
        <ellipse cx="70" cy="46" rx="30" ry="9" />
        <ellipse cx="95" cy="40" rx="20" ry="9" />
        <ellipse cx="330" cy="34" rx="28" ry="7" />
        <ellipse cx="350" cy="30" rx="16" ry="7" />
      </g>
      <rect y="248" width="400" height="52" fill={f("ground")} />
      <rect y="248" width="400" height="2" fill="#9d9586" opacity="0.5" />
    </>
  );
}

function HouseWall({ f }) {
  return (
    <>
      <rect width="400" height="300" fill={f("wall")} />
      {range(30, 240, 30).map((y) => (
        <rect key={y} y={y} width="400" height="1" fill="#d6cdbd" opacity="0.5" />
      ))}
      <rect y="252" width="400" height="48" fill="#cbc1b0" />
      <rect y="252" width="400" height="4" fill="#b3a893" />
    </>
  );
}

const Shadow = ({ f, cx, cy, rx, ry = 6, o = 0.25 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#000" opacity={o} filter={f("blur")} />
);

function Pillar({ f, x }) {
  return (
    <g>
      <rect x={x} y="80" width="36" height="170" fill="#e8e1d4" />
      <rect x={x + 26} y="80" width="10" height="170" fill="#cfc5b3" />
      {range(100, 240, 22).map((y) => (
        <rect key={y} x={x} y={y} width="36" height="1" fill="#cdc3b1" />
      ))}
      <rect x={x - 5} y="69" width="46" height="12" rx="1" fill="#d7cdbb" />
      <rect x={x - 5} y="79" width="46" height="3" fill="#b5aa95" />
      <circle cx={x + 18} cy="58" r="16" fill="#ffd27a" opacity="0.25" />
      <rect x={x + 11} y="50" width="14" height="19" rx="2" fill={f("dark")} />
      <rect x={x + 14} y="53" width="8" height="12" rx="1" fill="#ffd98f" />
    </g>
  );
}

// Glass with a warm curtain behind it and diagonal reflections
function Pane({ f, x, y, w, h }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#f4e6c8" />
      {range(x + 8, x + w - 4, 14).map((cx) => (
        <rect key={cx} x={cx} y={y} width="5" height={h} fill="#e5d0a4" opacity="0.7" />
      ))}
      <rect x={x} y={y} width={w} height={h} fill={f("glass")} />
      <polygon points={`${x + w * 0.15},${y} ${x + w * 0.4},${y} ${x},${y + h * 0.45} ${x},${y + h * 0.2}`} fill="#fff" opacity="0.35" />
      <polygon points={`${x + w * 0.7},${y} ${x + w * 0.8},${y} ${x + w * 0.25},${y + h} ${x + w * 0.15},${y + h}`} fill="#fff" opacity="0.18" />
    </g>
  );
}

function SlidingWindow({ f }) {
  return (
    <g>
      <Shadow f={f} cx={200} cy={226} rx={120} ry={4} o={0.2} />
      <rect x="88" y="58" width="224" height="162" rx="2" fill={f("aluv")} />
      <rect x="96" y="66" width="208" height="146" fill="#5f6f7e" />
      <rect x="98" y="68" width="110" height="142" fill={f("alu")} />
      <Pane f={f} x={106} y={76} w={94} h={126} />
      <rect x="194" y="68" width="110" height="142" fill={f("alu")} />
      <Pane f={f} x={202} y={76} w={94} h={126} />
      <rect x="195" y="120" width="4" height="30" rx="1" fill="#6b7580" />
      <rect x="80" y="218" width="240" height="10" fill="#dad2c3" />
      <rect x="80" y="228" width="240" height="4" fill="#b5ab99" />
    </g>
  );
}

/* ---------- scenes ---------- */

function WroughtGate({ f }) {
  const yTop = (x) => {
    const t = (x - 94) / 212;
    return 112 - 120 * t + 120 * t * t;
  };
  const bars = range(105, 295, 11);
  return (
    <>
      <Outdoor f={f} />
      <polygon points="94,250 306,250 370,300 30,300" fill="#ddd6ca" opacity="0.7" />
      <Shadow f={f} cx={200} cy={250} rx={130} />
      {bars.map((x) => (
        <g key={x}>
          <rect x={x - 2} y={yTop(x) - 4} width="4" height={244 - yTop(x) + 4} fill={f("iron")} />
          <polygon points={`${x - 4},${yTop(x) - 3} ${x},${yTop(x) - 13} ${x + 4},${yTop(x) - 3}`} fill={f("gold")} />
        </g>
      ))}
      <path d="M94 112 Q200 52 306 112" fill="none" stroke={IRON} strokeWidth="6" />
      <rect x="94" y="110" width="7" height="136" fill={f("iron")} />
      <rect x="299" y="110" width="7" height="136" fill={f("iron")} />
      <rect x="196" y="80" width="8" height="166" fill={f("iron")} />
      <rect x="94" y="150" width="212" height="6" fill={IRON} />
      <rect x="94" y="222" width="212" height="6" fill={IRON} />
      <rect x="94" y="238" width="212" height="8" fill={IRON} />
      {[146, 254].map((cx) => (
        <g key={cx} fill="none" stroke={f("gold")} strokeWidth="3" strokeLinecap="round">
          <path d={`M${cx - 30} 188 c0 -18 24 -18 24 0 s-14 14 -14 4`} />
          <path d={`M${cx + 30} 188 c0 -18 -24 -18 -24 0 s14 14 14 4`} />
          <circle cx={cx} cy="188" r="9" />
          <path d={`M${cx} 162 v14 M${cx} 200 v16`} />
        </g>
      ))}
      <Pillar f={f} x={58} />
      <Pillar f={f} x={306} />
      <ellipse cx="60" cy="250" rx="16" ry="5" fill="#6aa35c" />
      <ellipse cx="342" cy="250" rx="16" ry="5" fill="#6aa35c" />
    </>
  );
}

function IronGate({ f }) {
  return (
    <>
      <Outdoor f={f} />
      <polygon points="94,250 306,250 370,300 30,300" fill="#ddd6ca" opacity="0.7" />
      <Shadow f={f} cx={200} cy={250} rx={130} />
      {range(104, 296, 12).map((x) => (
        <g key={x}>
          <rect x={x - 2} y="102" width="4" height="72" fill={f("iron")} />
          <polygon points={`${x - 4},104 ${x},92 ${x + 4},104`} fill={f("gold")} />
        </g>
      ))}
      <rect x="94" y="112" width="212" height="7" fill={IRON} />
      <rect x="94" y="168" width="212" height="7" fill={IRON} />
      {[98, 202].map((x) => (
        <g key={x}>
          <rect x={x} y="175" width="100" height="66" fill={f("dark")} />
          <rect x={x + 8} y="183" width="38" height="50" fill="none" stroke="#4d5764" strokeWidth="2" />
          <rect x={x + 54} y="183" width="38" height="50" fill="none" stroke="#4d5764" strokeWidth="2" />
          <rect x={x + 8} y="183" width="38" height="3" fill="#56606d" />
          <rect x={x + 54} y="183" width="38" height="3" fill="#56606d" />
        </g>
      ))}
      <rect x="94" y="102" width="7" height="144" fill={f("iron")} />
      <rect x="299" y="102" width="7" height="144" fill={f("iron")} />
      <rect x="196" y="102" width="8" height="144" fill={f("iron")} />
      <rect x="94" y="239" width="212" height="7" fill={IRON} />
      <rect x="184" y="196" width="8" height="18" rx="2" fill={f("gold")} />
      <rect x="208" y="196" width="8" height="18" rx="2" fill={f("gold")} />
      <Pillar f={f} x={58} />
      <Pillar f={f} x={306} />
    </>
  );
}

function SteelShed({ f }) {
  const roofY = (x) => (x <= 200 ? 136 - 0.4 * (x - 50) : 136 - 0.4 * (350 - x));
  const web = range(78, 322, 22)
    .map((x, i) => `${x},${i % 2 ? roofY(x) + 4 : 124}`)
    .join(" ");
  return (
    <>
      <Outdoor f={f} />
      <Shadow f={f} cx={200} cy={252} rx={160} ry={8} />
      <rect x="72" y="128" width="256" height="122" fill="#2c343e" />
      <rect x="72" y="128" width="80" height="122" fill={f("steelv")} />
      {range(76, 150, 6).map((x) => (
        <rect key={x} x={x} y="128" width="1.5" height="122" fill="#7a8591" opacity="0.6" />
      ))}
      <g>
        <rect x="200" y="212" width="46" height="38" fill={f("box")} />
        <rect x="250" y="222" width="36" height="28" fill={f("box")} />
        <rect x="222" y="190" width="30" height="22" fill={f("box")} />
        <rect x="196" y="248" width="94" height="4" fill="#8a6a3e" />
      </g>
      <rect x="72" y="122" width="256" height="6" fill={f("steelv")} />
      <polyline points={web} fill="none" stroke="#9aa5b1" strokeWidth="3" />
      <polygon points="50,126 200,66 200,76 50,136" fill="#c4ccd5" />
      <polygon points="200,66 350,126 350,136 200,76" fill="#97a3af" />
      <polygon points="50,136 200,76 350,136 350,139 200,79 50,139" fill="#5d6874" />
      {[66, 322].map((x) => (
        <g key={x}>
          <rect x={x} y="124" width="12" height="126" fill={f("steel")} />
          <rect x={x - 2} y="124" width="16" height="3" fill="#6d7884" />
          <rect x={x} y="232" width="12" height="18" fill="#fba405" />
          {[236, 244].map((y) => (
            <rect key={y} x={x} y={y} width="12" height="3" fill={IRON} opacity="0.8" />
          ))}
        </g>
      ))}
    </>
  );
}

function AluWindow({ f }) {
  return (
    <>
      <HouseWall f={f} />
      <SlidingWindow f={f} />
      <rect x="120" y="240" width="160" height="12" rx="3" fill="#b77a4b" />
      {range(130, 270, 16).map((x, i) => (
        <ellipse key={x} cx={x} cy={236 - (i % 2) * 4} rx="10" ry="7" fill={f("green")} />
      ))}
    </>
  );
}

function AluDoor({ f, id }) {
  return (
    <>
      <rect width="400" height="300" fill={f("wall")} />
      <rect y="250" width="400" height="50" fill={f("floor")} />
      {range(-60, 440, 50).map((x) => (
        <line key={x} x1={x} y1="250" x2={x + (x - 200) * 0.35} y2="300" stroke="#a8a299" strokeWidth="1" opacity="0.6" />
      ))}
      <Shadow f={f} cx={200} cy={252} rx={110} ry={4} />
      <rect x="100" y="38" width="200" height="214" fill="#434c57" />
      <clipPath id={id + "out"}>
        <rect x="110" y="48" width="180" height="196" />
      </clipPath>
      <g clipPath={`url(#${id}out)`}>
        <rect x="110" y="48" width="180" height="196" fill={f("sky")} />
        <ellipse cx="150" cy="210" rx="60" ry="40" fill={f("green")} />
        <ellipse cx="250" cy="215" rx="70" ry="38" fill={f("green")} />
        <rect x="110" y="200" width="180" height="4" fill="#9aa4ad" />
        {range(116, 290, 12).map((x) => (
          <rect key={x} x={x} y="200" width="2" height="44" fill="#9aa4ad" />
        ))}
        <rect x="110" y="48" width="180" height="196" fill={f("glass")} opacity="0.6" />
        <polygon points="120,48 160,48 110,120 110,90" fill="#fff" opacity="0.3" />
        <polygon points="230,48 250,48 180,244 160,244" fill="#fff" opacity="0.15" />
      </g>
      <rect x="196" y="38" width="8" height="214" fill="#434c57" />
      <rect x="208" y="128" width="5" height="40" rx="2" fill={f("steel")} />
      <rect x="92" y="250" width="216" height="4" fill="#7c858f" />
      <polygon points="318,252 350,252 346,218 322,218" fill="#c46d3f" />
      <rect x="318" y="214" width="32" height="6" rx="1" fill="#a95a31" />
      {[
        [334, 190, 0],
        [322, 200, -35],
        [346, 200, 35],
        [328, 178, -15],
        [341, 178, 15],
      ].map(([cx, cy, r]) => (
        <ellipse key={cx + "" + cy} cx={cx} cy={cy} rx="7" ry="20" fill={f("green")} transform={`rotate(${r} ${cx} ${cy})`} />
      ))}
    </>
  );
}

function ShowerCabin({ f }) {
  return (
    <>
      <rect width="400" height="300" fill="#eef0f2" />
      {range(0, 250, 25).map((y) => (
        <rect key={"h" + y} y={y} width="400" height="1" fill="#d5dbe1" />
      ))}
      {range(0, 400, 50).map((x) => (
        <rect key={"v" + x} x={x} width="1" height="250" fill="#d5dbe1" />
      ))}
      <rect y="250" width="400" height="50" fill="#c9cfd6" />
      {range(0, 400, 40).map((x) => (
        <rect key={x} x={x} y="250" width="1" height="50" fill="#b3bac2" />
      ))}
      <rect x="140" y="64" width="6" height="90" fill={f("steel")} />
      <rect x="140" y="64" width="30" height="6" fill={f("steel")} />
      <ellipse cx="172" cy="74" rx="14" ry="5" fill={f("steelv")} />
      {range(162, 184, 5).map((x, i) => (
        <rect key={x} x={x} y={86 + (i % 2) * 14} width="1.5" height="12" fill="#8cc0e6" opacity="0.8" />
      ))}
      <rect x="150" y="150" width="14" height="6" rx="2" fill={f("steel")} />
      <rect x="88" y="244" width="214" height="8" fill="#fff" />
      <rect x="88" y="251" width="214" height="3" fill="#b8c0c8" />
      <rect x="90" y="46" width="100" height="198" fill={f("glass")} />
      <rect x="192" y="46" width="108" height="198" fill={f("glass")} />
      <rect x="90" y="46" width="100" height="198" fill="none" stroke="#a9c5da" strokeWidth="2" />
      <rect x="192" y="46" width="108" height="198" fill="none" stroke="#a9c5da" strokeWidth="2" />
      <polygon points="100,46 140,46 90,130 90,80" fill="#fff" opacity="0.4" />
      <polygon points="240,46 258,46 212,244 194,244" fill="#fff" opacity="0.25" />
      <rect x="86" y="40" width="218" height="6" fill={f("steelv")} />
      {[80, 200].map((y) => (
        <rect key={y} x="186" y={y} width="10" height="16" rx="2" fill={f("steel")} />
      ))}
      <rect x="206" y="126" width="5" height="54" rx="2" fill={f("steel")} />
      <rect x="326" y="96" width="14" height="4" fill={f("steel")} />
      <rect x="318" y="98" width="30" height="80" rx="3" fill="#fba405" />
      <rect x="318" y="160" width="30" height="5" fill="#00225f" />
    </>
  );
}

function ShopShutter({ f }) {
  const items = [
    ["#fba405", 86],
    ["#00225f", 104],
    ["#7a8b9c", 122],
    ["#c46d3f", 250],
    ["#fba405", 270],
    ["#00225f", 290],
  ];
  return (
    <>
      <rect width="400" height="300" fill="#e8e2d7" />
      <rect y="252" width="400" height="48" fill="#bdb6aa" />
      {range(0, 400, 32).map((x) => (
        <rect key={x} x={x} y="252" width="1" height="48" fill="#a39c90" />
      ))}
      <rect x="50" y="30" width="300" height="38" rx="3" fill="#00225f" />
      <rect x="50" y="64" width="300" height="4" fill="#fba405" />
      <rect x="70" y="42" width="60" height="6" rx="3" fill="#fba405" />
      <rect x="70" y="52" width="110" height="4" rx="2" fill="#ffffff" opacity="0.6" />
      <rect x="70" y="92" width="260" height="160" fill="#262c34" />
      <rect x="76" y="215" width="248" height="4" fill="#4a525c" />
      {items.map(([c, x]) => (
        <rect key={x} x={x} y="199" width="14" height="16" fill={c} opacity="0.9" />
      ))}
      <rect x="64" y="76" width="272" height="18" rx="2" fill={f("steelv")} />
      {range(94, 180, 8).map((y) => (
        <g key={y}>
          <rect x="72" y={y} width="256" height="8" fill={f("slat")} />
          <rect x="72" y={y + 7} width="256" height="1" fill="#848d97" />
        </g>
      ))}
      <rect x="72" y="182" width="256" height="8" fill="#6d7681" />
      <rect x="190" y="184" width="20" height="4" rx="1" fill="#fba405" />
      <rect x="64" y="94" width="8" height="158" fill="#8f99a4" />
      <rect x="328" y="94" width="8" height="158" fill="#8f99a4" />
      <Shadow f={f} cx={200} cy={254} rx={140} ry={4} o={0.3} />
    </>
  );
}

function WindowGrill({ f }) {
  const cells = [];
  for (const cx of [124, 172, 228, 276]) for (const cy of [98, 150, 186]) cells.push([cx, cy]);
  return (
    <>
      <HouseWall f={f} />
      <SlidingWindow f={f} />
      <g>
        <rect x="92" y="62" width="216" height="152" fill="none" stroke={IRON} strokeWidth="6" />
        {[148, 200, 252].map((x) => (
          <rect key={x} x={x - 2} y="62" width="4" height="152" fill={f("iron")} />
        ))}
        {[124, 170].map((y) => (
          <rect key={y} x="92" y={y - 2} width="216" height="4" fill={IRON} />
        ))}
        {cells.map(([cx, cy]) => (
          <polygon
            key={cx + "-" + cy}
            points={`${cx},${cy - 14} ${cx + 14},${cy} ${cx},${cy + 14} ${cx - 14},${cy}`}
            fill="none"
            stroke={IRON}
            strokeWidth="3"
          />
        ))}
        {cells.map(([cx, cy]) => (
          <circle key={"c" + cx + cy} cx={cx} cy={cy} r="3" fill={f("gold")} />
        ))}
      </g>
    </>
  );
}

function SteelRacks({ f }) {
  const levels = [100, 172, 242];
  const boxes = [
    [80, 60, 30],
    [144, 40, 24],
    [206, 48, 34],
    [262, 44, 28],
  ];
  return (
    <>
      <rect width="400" height="300" fill="#e3e6ea" />
      {range(20, 250, 18).map((y) => (
        <rect key={y} y={y} width="400" height="1" fill="#cfd4da" />
      ))}
      <rect y="250" width="400" height="50" fill={f("floor")} />
      <rect y="266" width="400" height="5" fill="#fba405" />
      <Shadow f={f} cx={200} cy={252} rx={150} ry={5} />
      {levels.map((ly, li) =>
        boxes.map(([x, w, h], bi) =>
          (li + bi) % 3 === 2 ? null : (
            <g key={ly + "-" + x}>
              <rect x={x} y={ly - h} width={w} height={h} fill={f("box")} />
              <rect x={x + w / 2 - 3} y={ly - h} width="6" height={h} fill="#e8cfa3" opacity="0.8" />
              <rect x={x + w - 5} y={ly - h} width="5" height={h} fill="#000" opacity="0.1" />
            </g>
          )
        )
      )}
      {levels.map((y) => (
        <g key={y}>
          <rect x="70" y={y} width="260" height="9" fill="#fba405" />
          <rect x="70" y={y + 7} width="260" height="2" fill="#c47f00" />
        </g>
      ))}
      {[66, 195, 324].map((x) => (
        <g key={x}>
          <rect x={x} y="36" width="10" height="216" fill="#1f3a70" />
          <rect x={x + 7} y="36" width="3" height="216" fill="#12264d" />
          {range(44, 244, 10).map((y) => (
            <rect key={y} x={x + 3} y={y} width="3" height="4" fill="#5b76ad" />
          ))}
        </g>
      ))}
    </>
  );
}

function FiberPorch({ f }) {
  return (
    <>
      <Outdoor f={f} />
      <rect x="0" y="70" width="400" height="180" fill={f("wall")} />
      <rect x="24" y="120" width="40" height="80" fill="#8a6a4d" />
      <rect x="336" y="130" width="46" height="50" fill="#9ab4c8" />
      <rect x="336" y="130" width="46" height="50" fill="none" stroke="#fff" strokeWidth="3" />
      <polygon points="64,124 336,124 390,250 10,250" fill="#bfe0f5" opacity="0.25" />
      <Shadow f={f} cx={200} cy={250} rx={90} ry={6} o={0.35} />
      <g>
        <rect x="130" y="196" width="140" height="44" rx="12" fill={f("car")} />
        <polygon points="152,198 248,198 236,164 164,164" fill="#2c3744" />
        <polygon points="158,196 242,196 232,169 168,169" fill="#9dbfd8" />
        <polygon points="170,170 190,170 170,194 162,194" fill="#fff" opacity="0.35" />
        <ellipse cx="146" cy="214" rx="9" ry="6" fill="#fff4d6" />
        <ellipse cx="254" cy="214" rx="9" ry="6" fill="#fff4d6" />
        <rect x="176" y="210" width="48" height="10" rx="3" fill="#1a2129" />
        <rect x="136" y="236" width="20" height="14" rx="3" fill="#111" />
        <rect x="244" y="236" width="20" height="14" rx="3" fill="#111" />
        <rect x="186" y="226" width="28" height="7" rx="1" fill="#fba405" />
      </g>
      {[72, 320].map((x) => (
        <rect key={x} x={x} y="116" width="10" height="134" fill={f("steel")} />
      ))}
      <rect x="56" y="110" width="288" height="8" fill={f("steelv")} />
      <polygon points="40,84 360,84 360,112 40,112" fill={f("sheet")} />
      {range(46, 356, 10).map((x) => (
        <rect key={x} x={x} y="84" width="3" height="28" fill="#fff" opacity="0.3" />
      ))}
      <rect x="40" y="108" width="320" height="4" fill="#4f7fa3" opacity="0.8" />
    </>
  );
}

function Railing({ f }) {
  const posts = range(78, 322, 61);
  return (
    <>
      <Outdoor f={f} />
      <g fill="#b9c6d3">
        <rect x="20" y="150" width="50" height="100" />
        <rect x="80" y="120" width="40" height="130" />
        <rect x="250" y="135" width="46" height="115" />
        <rect x="306" y="160" width="60" height="90" />
      </g>
      <g fill="#dbe4ec">
        {range(88, 112, 12).map((x) => range(132, 236, 16).map((y) => <rect key={x + "-" + y} x={x} y={y} width="6" height="8" />))}
      </g>
      <rect x="0" y="232" width="400" height="18" fill="#d8d0c2" />
      <rect x="0" y="248" width="400" height="6" fill="#b5ab99" />
      <Shadow f={f} cx={200} cy={236} rx={140} ry={3} o={0.2} />
      {posts.slice(0, -1).map((x, i) => (
        <g key={x}>
          <rect x={x + 8} y="146" width={posts[i + 1] - x - 10} height="82" fill={f("glass")} />
          <polygon points={`${x + 16},146 ${x + 28},146 ${x + 12},228 ${x + 8},228 ${x + 8},190`} fill="#fff" opacity="0.3" />
          <rect x={x + 5} y="160" width="6" height="6" rx="1" fill={f("steel")} />
          <rect x={x + 5} y="210" width="6" height="6" rx="1" fill={f("steel")} />
        </g>
      ))}
      {posts.map((x) => (
        <rect key={x} x={x} y="136" width="7" height="96" fill={f("steel")} />
      ))}
      <rect x="66" y="128" width="268" height="10" rx="5" fill={f("steelv")} />
    </>
  );
}

const SCENES = {
  railing: Railing,
  wrought: WroughtGate,
  iron: IronGate,
  steel: SteelShed,
  aluwin: AluWindow,
  aludoor: AluDoor,
  glass: ShowerCabin,
  shutter: ShopShutter,
  grills: WindowGrill,
  allsteel: SteelRacks,
  fiber: FiberPorch,
};

// Picks the closest scene for a single service by its name (falls back to its category)
export function sceneFor(cat, name = "") {
  const n = name.toLowerCase();
  if (/grill/.test(n)) return "grills";
  if (/railing|stair/.test(n)) return "railing";
  if (/shed|structure|truss/.test(n)) return cat === "fiber" ? "fiber" : "steel";
  if (/rack|shelv|table|furniture|tank/.test(n)) return "allsteel";
  if (/canop|roof|sheet/.test(n)) return "fiber";
  if (/shower|cabin/.test(n)) return "glass";
  if (/shutter/.test(n)) return "shutter";
  if (/door|partition|facade|curtain/.test(n)) return cat === "glass" && !/door/.test(n) ? "glass" : "aludoor";
  if (/window|tempered/.test(n)) return cat === "glass" ? "glass" : "aluwin";
  if (/wrought|designer|entrance|swing|sliding gate/.test(n)) return "wrought";
  if (/gate/.test(n)) return cat === "wrought" ? "wrought" : "iron";
  return cat;
}

export default function Illustration({ kind, className = "" }) {
  const id = "i" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const f = (name) => `url(#${id}${name})`;
  const Scene = SCENES[kind] || WroughtGate;
  return (
    <svg className={`illus ${className}`} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Defs id={id} />
      <Scene f={f} id={id} />
    </svg>
  );
}
