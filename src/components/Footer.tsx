import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <div className="text-center">
      <p>
        Made with ❤️ by{' '}
        <Link className="font-bold" href="https://github.com/circle-hotaru">
          incircle
        </Link>{' '}
        on{' '}
        <Link
          className="font-bold"
          href="https://github.com/circle-hotaru/tarot-master"
        >
          GitHub
        </Link>
      </p>
    </div>
  )
}

export default Footer
