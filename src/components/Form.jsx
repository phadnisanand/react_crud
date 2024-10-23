/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
	description: ""
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  //   get the udpated Data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
		description: updateDataApi.description || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
	  console.log(addData);
    const res = await postData(addData);
    console.log("res", res);
    if (res.status === 200) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "",description:"" });
    }
  };

  //   updatePostData
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi._id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem._id === res.data._id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "",description: "" });
        setUpdateDataApi({});
      }
    } catch ({ error }) {
      console.log(error);
    }
  };

  //   form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Body"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
	  <div>
	    <label htmlFor="description"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add description"
          id="description"
          name="description"
          value={addData.description}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
