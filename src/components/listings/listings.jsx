import React, { Fragment, useEffect, useState } from "react";
import "./listings.scss";
import Paginate from "../paginate/paginate";
import { StarUnSaved, StarSaved, Money, Location, Timer } from "../images";
import Confirmationmodal from "../confirmation_modal/Confirmation_modal";
import jobService from "../../services/JobService";

const MAX_CHAR_LENGTH = 200;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToSave, setJobToSave] = useState(null);

  const { fetchJobs } = jobService();

  const handleSuccess = (res) => {
    const { entries, meta } = res.data;

    const updatedJobs = entries.map((job) => ({
      ...job,
      isTruncated: true,
    }));

    setJobs(entries);
    setMeta(meta);
  };

  //   get("jobs", {
  //     onSuccess: (res) => handleSuccess(res),
  //     params: {
  //       "populate[company]": true,
  //       "populate[job_types]": true,
  //       start: (page - 1) * MAX_PER_PAGE,
  //       limit: MAX_PER_PAGE,
  //     },
  //   });
  // };
  const truncate = (text, jobId) => {
    const job = jobs.find((job) => job.id === jobId);
    const shouldTruncate = text.length > MAX_CHAR_LENGTH && job?.isTruncated;
    if (!shouldTruncate) return text;
    const truncated = text.slice(0, MAX_CHAR_LENGTH);
    return truncated + "...";
  };
  const toggleTruncate = (jobId) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        return { ...job, isTruncated: !job.isTruncated };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const showModal = (job) => {
    setJobToSave(job);
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const acceptModal = (job) => {
    console.log("Job is saved!", jobToSave);
    hideModal();
  };

  useEffect(() => {
    const page = 1;
    fetchJobs(page, handleSuccess);
  }, []);
  const handlePageChange = (pageNumber) => {
    fetchJobs(pageNumber, handleSuccess);
  };

  return (
    <>
      <Confirmationmodal
        text="You want to save this job. Are you sure?"
        onAccept={acceptModal}
        onClose={hideModal}
        isOpen={isModalOpen}
      />
      <section>
        {jobs.map((job) => (
          <div key={job.id} className="listing__card">
            <header className="listing__header">
              <h1 className="listing__title">{job.title}</h1>
              <img
                onClick={() => showModal(job)}
                className="listing__saved"
                src={StarUnSaved}
                alt="Star"
              />
              <p className="listing__company">
                Posted by <span>{job.company.name}</span>
              </p>
            </header>

            <ul className="listing__items">
              <li>
                <img src={Money} alt="Image" />
                <b>Salary: {job.SalaryType}</b>
              </li>

              <li>
                <img src={Location} alt="" />
                <b>{job.location}</b>
              </li>
              <li>
                <img src={Timer} alt="" />
                {job.job_types.map((type, index, array) => (
                  <Fragment key={type.id}>
                    <span>{type.title}</span>

                    {index !== array.length - 1 && <span> , </span>}
                  </Fragment>
                ))}
              </li>
            </ul>

            <p className="listing__detail">
              {truncate(job.description, job.id)}
              <a onClick={() => toggleTruncate(job.id)}>
                <b>{job.isTruncated ? "See more" : "See less"}</b>
              </a>
            </p>

            <div className="listing__cta">Withdraw application</div>
          </div>
        ))}

        <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
      </section>
    </>
  );
}
