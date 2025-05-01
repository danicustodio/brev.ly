import { LinkList } from './components/link-list/link-list'
import { Logo } from './components/logo'
import { NewLink } from './components/new-link'

const MOCK_LINKS = [
  {
    id: '1',
    shortUrl: 'brev.ly/Portfolio-Dev',
    alias: 'Portfolio-Dev',
    originalUrl: 'devsite.portfolio.com.br/developer',
    accessCount: 30,
    createdAt: new Date(),
  },
  {
    id: '2',
    shortUrl: 'brev.ly/Linkedin-Profile',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '3',
    shortUrl: 'brev.ly/three',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '4',
    shortUrl: 'brev.ly/four',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '5',
    shortUrl: 'brev.ly/five',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '6',
    shortUrl: 'brev.ly/six',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '1',
    shortUrl: 'brev.ly/Portfolio-Dev',
    alias: 'Portfolio-Dev',
    originalUrl: 'devsite.portfolio.com.br/developer',
    accessCount: 30,
    createdAt: new Date(),
  },
  {
    id: '2',
    shortUrl: 'brev.ly/Linkedin-Profile',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '3',
    shortUrl: 'brev.ly/three',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '4',
    shortUrl: 'brev.ly/four',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '5',
    shortUrl: 'brev.ly/five',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
  {
    id: '6',
    shortUrl: 'brev.ly/six',
    alias: 'Linkedin-Profile',
    originalUrl: 'linkedin.com/in/myprofile',
    accessCount: 15,
    createdAt: new Date(),
  },
]

function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-gray-200)] py-8 px-4">
      <div className="flex justify-center flex-1">
        <main className="w-full max-w-[var(--main-max-width)] flex flex-col flex-1">
          <div className="flex justify-center mb-6 lg:justify-start">
            <Logo />
          </div>

          <div className="flex flex-col gap-3 flex-1 lg:flex-row">
            <div className="lg:min-w-96">
              <NewLink />
            </div>

            <div className="flex-1 min-h-0 overflow-auto">
              <LinkList
                links={MOCK_LINKS}
                onCopy={id => console.log(id)}
                onDelete={alias => console.log(alias)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
