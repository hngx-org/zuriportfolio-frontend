import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '../../../modules/assessment/component/banner';
import { OverviewItem } from '../../../modules/assessment/component/overviewItem';
import Button from '@ui/Button';

function AssessmentOverview() {
  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      <main className="w-full">
        {/* top banner component */}
        <AssessmentBanner
          title="Assessment Overview"
          subtitle="An overview of all answers."
          bannerImageSrc="/assets/images/banner/assessmentOverview.svg"
        />

        <div className="w-full flex flex-col">
          <div className="w-full py-6 md:py-9 lg:py-12 px-[26px] md:px-[42px] lg:px-[102px] flex flex-col gap-6 md:gap-8 lg:gap-10">
            {new Array(7).fill(0).map((_, index) => (
              <OverviewItem
                questionNumber={`${index + 1}`}
                key={index}
                answer="Content written in relation to the headline. Content written in relation to the headline. Content written in relation to the headline. Content written in relation to the headline. Content written in relation to the headline."
                question="Content written in relation to the headline. Content written in relation to the headline. Content written in relation to the headline. Content written in relation to the headline. Content written in relation to the headline."
              />
            ))}
          </div>

          <div className="w-full flex items-center justify-center py-14 md:py-16 lg:py-20">
            <Button className="w-full max-w-[349px]" size="lg">
              Submit
            </Button>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default AssessmentOverview;
