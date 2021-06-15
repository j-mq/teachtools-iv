import VideoControls from "./VideoControls";
import QuestionSet from "./QuestionSet";

const Layout = () => {
  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col'></div>
        <div className='col-12 col-md-8 d-flex justify-content-center'>
          <VideoControls />
        </div>
        <div className='col'></div>
      </div>
      <div className='row'>
        <div className='col'></div>
        <div className='col-12 col-md-8'>
          <QuestionSet />
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
};

export default Layout;
