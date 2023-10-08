import React from 'react';
import Image from 'next/image';
import photo1 from '/public/photo1.svg';
import bg1 from '/public/bg1.svg';
import total_projects from '/public/total-projects.svg';
import badge_beginner from '/public/badge-beginner.svg';
import Location from '/public/Location.svg';
import bg2 from '/public/bg2.png';
import bg3 from '/public/bg3.png';
import bg4 from '/public/bg4.png';
import bg5 from '/public/bg5.png';
import bg6 from '/public/bg6.png';
import bg7 from '/public/bg7.png';
import bg8 from '/public/bg8.png';
import bg9 from '/public/bg9.png';
import bg10 from '/public/bg10.png';
import bg11 from '/public/bg11.png';
import bg12 from '/public/bg12.png';
import photo2 from '/public/photo2.png';
import photo3 from '/public/photo3.png';
import photo4 from '/public/photo4.png';
import photo5 from '/public/photo5.png';
import photo6 from '/public/photo6.png';
import photo7 from '/public/photo7.png';
import photo8 from '/public/photo8.png';
import photo9 from '/public/photo9.png';
import photo10 from '/public/photo10.png';
import photo11 from '/public/photo11.png';
import photo12 from '/public/photo12.png';

const HomePage: React.FC = () => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 grid-gap-6 m-auto px-3 justify-evenly  ">
      <div className=" p-2 border-1 border m-auto mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg1} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo1}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Theresa Webb</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Product Designer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">UI Design</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">User Research</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Prototyping</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Interaction Design</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+5</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">11</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Beginner</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10 border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg2} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo2}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Jacob Jones</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Frontend Developer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">8</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Expert</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Port Harcourt, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10 border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg3} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo3}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Bessie Cooper</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Full Stack Engineer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">5</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Intermediate</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg4} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo4}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Jenny Wilson</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Cyber Security</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">8</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Expert</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Port Harcourt, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg5} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo5}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Annette Black</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Data Science</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">5</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Intermediate</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg6} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo6}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Guy Hawkins</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Graphic Designer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Photoshop</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Illustrator</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Adobe CC</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Motion</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+5</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">11</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Beginner</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg7} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo7}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Robert Fox</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Video Marketer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">UI Design</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">User Research</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Prototyping</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Interaction Design</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+5</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">8</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Intermediate</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg8} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo8}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Darlene Robertson</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Product Designerr</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">UI Design</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">User Research</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Prototyping</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Interaction Design</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+5</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">8</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Beginner</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg9} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo9}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Jerome Bell</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Mobile Developer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">11</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Expert</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Port Harcourt, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg10} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo10}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Leslie Alexander</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Cloud Computing</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">8</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Beginner</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg11} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo11}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Kathryn Murphy</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Full Stack Engineer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">5</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Intermediate</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Lagos, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-2 border-1 border m-auto  mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
        <Image className="w-full h-20 object-cover" src={bg12} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={photo12}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">Albert Flores</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">Frontend Developer</h1>

          <div className="m-auto font-ppReg  text-sm font-bold text-gray-600 text-center ">
            <button className="mt-4 border  border-gray-100 px-4 py-1 rounded-full">Node JS</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">JavaScript</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">React</button>
            <button className="mt-4 border border-gray-100 px-4 py-1 rounded-full">Python</button>
            <br />
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Vue JS</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">Figma</button>
            <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">+3</button>
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">8</h2>
              </div>
            </div>
            <div className="gap-2 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm md:text-lg">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">Expert</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">Port Harcourt, Nigeria</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
