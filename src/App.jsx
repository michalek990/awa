import { useState } from 'react'
import AWADruk from './AwaDrukV1.jsx'
import AWADrukV2 from './AWADrukV2.jsx'
import AWADrukV3 from './AWADrukV3_clean.jsx'

const css = `
  .switcher {
    position: fixed; bottom: 20px; right: 20px; z-index: 9999;
    display: flex; gap: 8px;
    background: rgba(28,28,46,0.92);
    backdrop-filter: blur(10px);
    padding: 10px 14px; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .switcher-label {
    font-family: sans-serif; font-size: 11px; font-weight: 600;
    color: rgba(255,255,255,0.4); letter-spacing: 1px;
    text-transform: uppercase; align-self: center; margin-right: 4px;
  }
  .switcher-btn {
    font-family: sans-serif; font-size: 12px; font-weight: 700;
    padding: 6px 14px; border-radius: 8px; cursor: pointer; border: none;
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);
    transition: all 0.2s;
  }
  .switcher-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
  .switcher-btn.active { background: #6c30a8; color: #fff; }
`

export default function App() {
  const getVersion = () => {
    const p = new URLSearchParams(window.location.search)
    const v = parseInt(p.get('v'))
    return [1, 2, 3].includes(v) ? v : 1
  }

  const [version, setVersion] = useState(getVersion)

  const switchTo = (v) => {
    const url = new URL(window.location)
    url.searchParams.set('v', v)
    window.history.pushState({}, '', url)
    setVersion(v)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <style>{css}</style>

      {version === 1 && <AWADruk />}
      {version === 2 && <AWADrukV2 />}
      {version === 3 && <AWADrukV3 />}

      <div className="switcher">
        <span className="switcher-label">Wersja</span>
        {[1, 2, 3].map(v => (
          <button
            key={v}
            className={`switcher-btn${version === v ? ' active' : ''}`}
            onClick={() => switchTo(v)}
          >
            V{v}
          </button>
        ))}
      </div>
    </>
  )
}