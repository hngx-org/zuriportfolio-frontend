interface Sections {
  title?: string;
  subtitle?: string;
  href?: string;
  slug?: string;
  desc?: string;
}

const SectionOne = ({ title, subtitle, href, slug, desc }: Sections) => {
  return (
    <div className="flex justify-center items-center pb-10">
      <div>
        <div>
          <h3 className="text-[#3F3F50] text-center font-manropeEB text-[20px]">{title}</h3>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SectionOne;
