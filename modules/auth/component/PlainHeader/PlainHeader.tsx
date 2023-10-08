import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/assets/404/logo-zuri-auth.svg';
import Container from '../Container/Container';

function PlainHeader() {
  return (
    <Container>
      <header className="py-6 xl:mx-auto lg:py-[14px]">
        <Link href={'/'}>
          <Image src={logo} alt="logo" />
        </Link>
      </header>
    </Container>
  );
}

export default PlainHeader;
