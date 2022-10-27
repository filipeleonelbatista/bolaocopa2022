import '../styles/PageComponent.css'

export default function PageComponent({ children }) {
  return (
    <div className="PageComponent">
      <div className='Header'></div>
      <main>
        {children}
      </main>
    </div>
  )
}
