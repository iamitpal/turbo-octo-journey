"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getData = async () => {
  const response = await fetch("http://localhost:8080/blog/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `${localStorage.getItem("user")}`,
    },
  });
  const data = await response.json();
  return data;
};

const page = () => {
  const [model, setModel] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the server
    getData().then((data) => {
      setData(data);
    });
  }, []);
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/blog/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, image }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.reload();
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {model && (
        <div>
          <h1 style={{ textAlign: "center" }}>Add Blog</h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "40vh",
            }}
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="description">Description:</label>
            <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <label htmlFor="image">Image:</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
            <br />
            <button type="submit">Submit</button>
          </form>
          <button
            onClick={() => {
              setModel(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div>
        <h1 style={{ textAlign: "center" }}>Blogs</h1>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            setModel(true);
          }}
        >
          Add Blog
        </button>
        <butto
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
        >
          Signout
        </butto>
        <ul>
          {data.map((blog, i) => (
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
                borderRadius: "5px",
              }}
              key={i}
            >
              <h2>{blog.title}</h2>
              {/* <Image src={blog.image} width={100} height={100} alt="" /> */}
              <img src={blog.image} alt="" />
              <p>{blog.description}</p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
