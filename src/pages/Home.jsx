import { useEffect, useState } from "react";
import { NavBar } from "../components/common/NavBar";
import { GridView } from "../components/GridView";
import { ListView } from "../components/ListView";
import { Button } from "../components/common/Button";
import { AddProjectModal } from "../components/common/AddProjectModal";
import { projectEndpoints } from "../services/apiEndpoints";
import { authEndpoints } from "../services/apiEndpoints";
import toast from "react-hot-toast";
import { Spinner } from "../components/common/Spinner";

export const Home = ({ loader, setLoader, setLoading }) => {
  //  project api url
  const { GET_ALL_PROJ_URL } = projectEndpoints;

  //  auth api url
  const { GET_USER_URL } = authEndpoints;

  const [isGridLayout, setIsGridLayout] = useState(false);
  const [addProjModal, setAddProjModal] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [user, setUser] = useState(null);

  //  get user Details
  const getUserDetails = async () => {
    setLoader(true);
    try {
      //  fetch user Details;
      const response = await fetch(GET_USER_URL, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      });

      //  convert data into json format;
      const result = await response.json();
      // console.log("print user data: ", result);
      if (!result.success) {
        toast.error(result.message);
        throw Error("Something went wrong");
      } else {
        setUser(result.data);
        setLoader(false);
        // console.log("print user: ", user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  get all projects;
  const getAllProjects = async () => {
    try {
      //  fetch all projects
      const response = await fetch(GET_ALL_PROJ_URL, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      });

      //  convert data into json format;
      const result = await response.json();
      // console.log("print project data: ", result);
      if (!result.success) {
        toast.error(result.message);
        throw Error("Something went wrong");
      } else {
        // toast.success(result.message);
        setProjectData(result.projects);
        // console.log(projectData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  show all projects if user is logged in;
  useEffect(() => {
    getUserDetails();
  }, [setProjectData, projectData]);

  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <NavBar gridLayout={isGridLayout} setGridLayout={setIsGridLayout} />

          {/* add search field and add project button */}
          <div className="flex items-center justify-between px-[140px] my-[30px] m-auto">
            <h2 className="text-2xl">Hi, {user ? user.name : ""} 👋</h2>
            <div className="flex items-center gap-10">
              {/*  */}
              <Button
                text={"+ Project"}
                className="w-[180px] font-semibold"
                onClick={() => setAddProjModal(true)}
              />
            </div>
          </div>

          {/* Show Created Projects */}
          <div className="cards">
            {isGridLayout ? (
              <div className="grid px-[150px] ">
                {projectData.length > 0 ? (
                  projectData.map((item, index) => (
                    <GridView
                      setProjectData={setProjectData}
                      gridLayout={isGridLayout}
                      key={index}
                      project={item}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-4 w-screen mt-[100px]">
                    <p className="text-[30px] font-semibold">
                      No Projects Found
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="list px-[150px]">
                {projectData.length > 0 ? (
                  projectData.map((item, index) => (
                    <ListView
                      key={index}
                      setProjectData={setProjectData}
                      project={item}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-4 w-[100%] mt-[100px]">
                    <p className="text-[30px] font-semibold">
                      No Projects Found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/*  show Add Project modal */}
          {addProjModal && (
            <AddProjectModal
              setModal={setAddProjModal}
              setLoading={setLoading}
            />
          )}
        </>
      )}
    </>
  );
};
