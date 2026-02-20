const sizes = [
  { label: "text-xs", cls: "text-xs" },
  { label: "text-sm", cls: "text-sm" },
  { label: "text-base", cls: "text-base" },
  { label: "text-lg", cls: "text-lg" },
  { label: "text-xl", cls: "text-xl" },
  { label: "text-2xl", cls: "text-2xl" },
  { label: "text-3xl", cls: "text-3xl" },
  { label: "text-4xl", cls: "text-4xl" },
  { label: "text-5xl", cls: "text-5xl" },
  { label: "text-6xl", cls: "text-6xl" },
  { label: "text-7xl", cls: "text-7xl" },
  { label: "text-8xl", cls: "text-8xl" },
];

const TypeScale = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16">
      <h1 className="text-3xl font-bold mb-2">Type Scale Tester</h1>
      <p className="text-muted-foreground mb-1 text-sm">
        Viewport: <span className="font-mono" id="vw" />
      </p>
      <p className="text-muted-foreground mb-8 text-sm">
        Computed html font-size: <span className="font-mono" id="fs" />
      </p>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function update(){
              document.getElementById('vw').textContent=window.innerWidth+'×'+window.innerHeight+'px';
              document.getElementById('fs').textContent=getComputedStyle(document.documentElement).fontSize;
            }
            update();window.addEventListener('resize',update);
          `,
        }}
      />

      <div className="space-y-6 border border-border rounded-xl p-6 md:p-10">
        {sizes.map(({ label, cls }) => (
          <div key={label} className="flex items-baseline gap-4 border-b border-border/40 pb-4 last:border-0">
            <span className="text-xs font-mono text-muted-foreground w-20 shrink-0">{label}</span>
            <span className={cls}>The quick brown fox jumps over the lazy dog</span>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Font Weights</h2>
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
            <p key={w} className="text-lg mb-1" style={{ fontWeight: w }}>
              {w} — The quick brown fox
            </p>
          ))}
        </div>

        <div className="border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Spacing & Layout</h2>
          <div className="space-y-3">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">p-4 container</p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg">
              <p className="text-sm text-muted-foreground">p-8 container</p>
            </div>
            <div className="bg-primary/10 p-12 rounded-lg">
              <p className="text-sm text-muted-foreground">p-12 container</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground/50 mt-12">
        Navigate to <span className="font-mono">/type-scale</span> to view this page
      </p>
    </div>
  );
};

export default TypeScale;
