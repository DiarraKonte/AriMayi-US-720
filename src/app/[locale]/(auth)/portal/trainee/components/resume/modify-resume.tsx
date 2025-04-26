import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button, Card, Col, Form, Input, Row, DatePicker, theme, Select} from "antd"; // Importing necessary components from Ant Design
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid"; // Importing the UUID library to generate unique IDs
import { useParams } from "next/navigation";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import { format } from "date-fns"; // Importing the date-fns library for date formatting
import moment from "moment";
import { loadFromLocalStorage, saveToLocalStorage } from "../../localStorage";
import { useAppDispatch } from "@/lib/hook";
import { Leisure, Skill, SchoolCareer, ProfessionalExperience, Location} from "../../Slice/resume/resumeSlice";
import {
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addHobby,
  updateHobby,
  deleteHobby,
  setLocation
} from "@/app/[locale]/(auth)/portal/trainee/Slice/resume/resumeSlice"; // Importing actions from the resume slice
import { useI18n } from "../../../../../../../../locales/client";


const { RangePicker } = DatePicker; // Destructuring the RangePicker component from the DatePicker

export default function TraineeModifyResume() {
  const t = useI18n();
  const { useToken } = theme;
  const { token } = useToken();
  const params = useParams(); // Get the URL parameters
  const id = params.id; // Extract the ID from the URL

  const dispatch = useAppDispatch();
  const [experienceForm] = Form.useForm(); // Create a form instance for the experience form
  const [educationForm] = Form.useForm();
  const [skillsForm] = Form.useForm();
  const [hobbyForm] = Form.useForm();
  const [locationForm] = Form.useForm();

  const [hobby, setHobby] = useState("");

  const professionalExperience = useSelector(
    (state: RootState) => state.resume.professionalExperience,
  ); //  Select the resume data from the Redux store
  const schoolCareer = useSelector((state: RootState) => state.resume.schoolCareer);
  const skills = useSelector((state: RootState) => state.resume.skills);
  const leisure = useSelector((state: RootState) => state.resume.leisure);
  const locations = useSelector((state: RootState) => state.resume.locations);

  const [localExperiences, setLocalExperiences] = useState(professionalExperience); // Create local state variables to store the resume data
  const [localEducation, setLocalEducation] = useState(schoolCareer);
  const [localSkills, setLocalSkills] = useState(skills);
  const [localHobbies, setLocalHobbies] = useState(leisure);
  const [localLocation, setLocalLocation] = useState(locations);

  const [editingExperience, setEditingExperience] = useState<ProfessionalExperience | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Create state variables to handle editing


  
  // Function to add or update an experience entry
  const handleAddOrUpdateExperience = (values: {  titre: string;  societe: string;   secteur: string;   lieu: string;   dates: any[];   description: string;} ) => {
    const { titre,societe, secteur, lieu, dates, description } = values;
  
    let formattedDates = dates.map((date) => date.format("YYYY-MM-DD"));
  
    const newExperience = {
      id: editingExperience ? editingExperience.id : uuidv4(), 
      position: titre,
      company: societe,
      sector: secteur,
      place: lieu,
      start_date: formattedDates[0] || "",
      end_date: formattedDates[1] || "",
      description: description || "",
      resume: 1, // Identifiant du CV lié
    };
  
    if (isEditing) {
      dispatch(updateExperience({ id: newExperience.id, data: newExperience }));
      setIsEditing(false);
      setEditingExperience(null);
    } else {
      dispatch(addExperience(newExperience));
    }
  
    setLocalExperiences((prev) => [...prev, newExperience]);
  
    // 🔥 Mise à jour immédiate du localStorage
    saveToLocalStorage("resumeData", {
      experiences: [...localExperiences, newExperience], 
      education: localEducation,
      skills: localSkills,
      hobbies: localHobbies,
      location: localLocation,
    });
  
    experienceForm.resetFields();
  };
  

  // Function to handle editing an experience entry
  const handleEditExperience = (professionalExperience : ProfessionalExperience) => {
    setEditingExperience(professionalExperience);
    setIsEditing(true);
    experienceForm.setFieldsValue({
      titre: professionalExperience.position,
      societe: professionalExperience.company,
      secteur: professionalExperience.sector,
      lieu: professionalExperience.place,
      dates: [
        professionalExperience.start_date ? moment(professionalExperience.start_date) : null,
        professionalExperience.end_date ? moment(professionalExperience.end_date) : null,
      ],
      description: professionalExperience.description,
    });
  };
  

  // Function to delete an experience entry
  const handleDeleteExperience = (id : string) => {
    setLocalExperiences((prevExperiences) =>
      prevExperiences.filter((exp) => exp.id !== id),
    );
    dispatch(deleteExperience(id));
  };

  const [editingEducation, setEditingEducation] =  useState<SchoolCareer | null>(null);
  const [isEditingEducation, setIsEditingEducation] = useState(false);

  // Function to add or update an education entry
  const handleAddOrUpdateEducation = (values : {niveau : string; filiere: string; etablissement: string; dates: any[];}) => {
    const { niveau, filiere, etablissement, dates } = values;
  
    const formattedDates = dates?.map((date) => date.format("YYYY-MM-DD")) || [];
  
    const newEducation = {
      id: editingEducation ? editingEducation.id : uuidv4(),      
      school: etablissement,
      degree: niveau,
      programstudy: filiere,
      start_date: formattedDates[0] || "", // Nouveau champ
      end_date: formattedDates[1] || "", // Nouveau champ
      resume : 1
    };
  
  
    if (isEditingEducation) {
      setLocalEducation((prevEducation: SchoolCareer[]) =>
        prevEducation.map((edu: SchoolCareer) =>
          edu.id === newEducation.id ? newEducation : edu
        )
      );
      dispatch(updateEducation({ id: newEducation.id, data: newEducation }));
      setIsEditingEducation(false);
      setEditingEducation(null);
    } else {
      setLocalEducation((prevEducation: SchoolCareer[]) => [
        ...prevEducation,
        newEducation,
      ]);
      dispatch(addEducation(newEducation));
    }
    educationForm.resetFields();
  };

// Function to handle editing an education entry
const handleEditEducation = (education: SchoolCareer) => {
  setEditingEducation(education);
  setIsEditingEducation(true);
  educationForm.setFieldsValue({
    niveau: education.degree,
    filiere: education.programstudy,
    etablissement: education.school, // Changé de "institution" à "school"
    dates: [
      moment(education.start_date), // Changé de "startDate" à "start_date"
      moment(education.end_date),   // Changé de "endDate" à "end_date"
    ],
  });
};

  // Function to delete an education
  const handleDeleteEducation = (id : string) => {
    setLocalEducation((prevEducation) =>
      prevEducation.filter((edu) => edu.id !== id),
    );
    dispatch(deleteEducation(id));
  };

const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isEditingSkill, setIsEditingSkill] = useState(false);

  //  Function to add or update a skill


  // Function to add or update a skill
  const handleAddOrUpdateSkill = (values: { skill: string; level: string; category: string }) => {
    const { skill, level, category } = values;
  
    const newSkill: Skill = {
      id: editingSkill ? editingSkill.id : uuidv4(), 
      name : skill,
      level: level, 
      category: category,
      resume : 1
    };
  
    if (isEditingSkill) {
      setLocalSkills((prevSkills) =>
        prevSkills.map((s) => (s.id === newSkill.id ? newSkill : s))  // Map avec le type de s correctement défini
      );
      dispatch(updateSkill({ id: newSkill.id, data: newSkill }));
      setIsEditingSkill(false);
      setEditingSkill(null);
    } else {
      setLocalSkills((prevSkills) => [...prevSkills, newSkill]);
      dispatch(addSkill(newSkill));
    }
    skillsForm.resetFields();
  };
  

  // Function to handle editing a skill
  const handleEditSkill = (skill : Skill) => {
    setEditingSkill(skill);
    setIsEditingSkill(true);
    skillsForm.setFieldsValue({
      skill: skill.name,
      level: skill.level, 
      category: skill.category,
    });
  };
  

  // Function to delete a skill
  const handleDeleteSkill = (id: string) => {
    setLocalSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== id),
    ); // Remove the skill from the local state
    dispatch(deleteSkill(id));
  };

  const [editingHobby, setEditingHobby] = useState<Leisure | null>(null);
  const [isEditingHobby, setIsEditingHobby] = useState(false);

  // Function to add or update a hobby
  const handleAddOrUpdateHobby = (values : {loisirs : string}) => {
    const hobbyName = values.loisirs;

    const newHobby: Leisure = {
      id: editingHobby ? editingHobby.id : uuidv4(), // Generate a unique ID for the new hobby
      name: hobbyName,
      resume : 1
    };

    if (isEditingHobby) {
      setLocalHobbies(
        (prevHobbies) =>
          prevHobbies.map((hobby) =>
            hobby.id === newHobby.id ? newHobby : hobby,
          ), // Update the hobby
      );
      dispatch(updateHobby({ id: newHobby.id, data: newHobby }));
      setIsEditingHobby(false);
      setEditingHobby(null);
    } else {
      setLocalHobbies((prevHobbies) => [...prevHobbies, newHobby]); // Add the new hobby to the local state
      dispatch(addHobby(newHobby));
    }

    hobbyForm.resetFields(); // Reset the form fields
  };

  // Function to handle editing a hobby
  const handleEditHobby = (hobby: Leisure) => {
    setEditingHobby(hobby);
    setIsEditingHobby(true);
    hobbyForm.setFieldsValue({
      loisirs: hobby.name,
    });
  };

  // Function to delete a hobby
  const handleDeleteHobby = (id: string) => {
    setLocalHobbies((prevHobbies) =>
      prevHobbies.filter((hobby) => hobby.id !== id),
    );
    dispatch(deleteHobby(id));
  };

  //   // Function to set the location
  const handleSetLocation = (values: { city: string; country: string }) => {
    const { city, country } = values;
  
    const newLocation: Location = {
      id: editingEducation ? editingEducation.id : uuidv4(),
      city,
      country,
      resume: 1, 
    };
  
    setLocalLocation([newLocation]);
    dispatch(setLocation([newLocation]));
    locationForm.resetFields();
  };
  
  
  // Load the resume data from the local storage
  useEffect(() => {
    const savedData = loadFromLocalStorage("resumeData");
    if (savedData) {
      console.log("Données chargées depuis le localStorage :", savedData); //Check if the data is well recovered
      setLocalExperiences(savedData.professionalExperience || []);
      setLocalEducation(savedData.schoolCareer || []);
      setLocalSkills(savedData.skills || []);
      setLocalHobbies(savedData.leisure || []);
      setLocalLocation(savedData.locations || "");
    }
  }, []);

  // Save the resume data to the local storage
  useEffect(() => {
    console.log("Enregistrement dans localStorage :", {
      professionalExperience: localExperiences,
      schoolCareer: localEducation,
      skills: localSkills, 
      leisure: localHobbies,
      locations: localLocation,
    });
  
    saveToLocalStorage("resumeData", {
      professionalExperience: localExperiences,
      schoolCareer: localEducation,
      skills: localSkills,
      leisure: localHobbies,
      locations: localLocation,
    });
  }, [localExperiences, localEducation, localSkills, localHobbies, localLocation]);
  

  return (
    <Content
      style={{
        paddingTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "15%",
        paddingRight: "15%",
      }}
    >
      <Title
        style={{
          color: token.colorWhite,
          textAlign: "center",
          paddingBottom: 5,
          background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
          textTransform: "uppercase",
          fontWeight: "950",
          fontSize: "25px",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "50px",
        }}
      >
        {t("Resume.resumeInput")}
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Row gutter={[8, 45]}>
            <Col span={24}>
              <div>
                {localExperiences.map(
                  (
                    experience, // Map through the experiences array
                  ) => (
                    <div
                      key={experience.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <Card // Display the experience details in a card
                        style={{
                          borderRadius: "15px",
                          boxShadow: "3px 4px 9.9px 0px #A25C4526",
                          flex: 1,
                          
                        }}
                      >
                        <ul
                          style={{ listStyleType: "disc", paddingLeft: "20px" }}
                        >
                          {/* Display the experience details */}
                          <li>
                            <Text strong>
                              {t("Experienceform.position")} :
                            </Text>
                          </li>
                          <Text>{experience.position}</Text>
                          <li>
                            <Text strong>{t("Experienceform.company")} :</Text>
                          </li>
                          <Text>{experience.company}</Text>
                          <li>
                            <Text strong>{t("Experienceform.sector")} :</Text>
                          </li>
                          <Text>{experience.sector}</Text>
                          <li>
                            <Text strong>{t("Experienceform.location")} :</Text>
                          </li>
                          <Text>{experience.place}</Text>
                          <li>
                          <Text strong>{t("Experienceform.description")} :</Text>
                        </li>
                        <Text>{experience.description || t("Experienceform.no_description")}</Text>
                          <li>
                            <Text strong>{t("Experienceform.date")} :</Text>
                          </li>
                          <Text>
                            {experience.start_date && !isNaN(new Date(experience.start_date).getTime()) 
                              ? format(new Date(experience.start_date), "MMMM yyyy") 
                              : "N/A"}{" "}
                            -{" "}
                            {experience.end_date && !isNaN(new Date(experience.end_date).getTime()) 
                              ? format(new Date(experience.end_date), "MMMM yyyy") 
                              : "Présent"}
                          </Text>
                        </ul>
                      </Card>
                      <div
                        style={{
                          marginLeft: "16px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#F68A67",
                            borderColor: "#F68A67",
                            borderRadius: "6px",
                            color: "#fff",
                            fontWeight: "bold",
                            width: "33px",
                            height: "33px",
                            marginBottom: "20px",
                          }}
                        >
                          <EditOutlined
                            onClick={() => handleEditExperience(experience)}
                          />
                          {/* Edit the experience */}
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#F68A67",
                            borderColor: "#F68A67",
                            borderRadius: "6px",
                            color: "#fff",
                            fontWeight: "bold",
                            width: "33px",
                            height: "33px",
                            marginBottom: "20px",
                          }}
                        >
                          <DeleteOutlined
                            onClick={() =>
                              handleDeleteExperience(experience.id)
                            }
                          />
                          {/* Delete the experience */}
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </div>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "550px",
                }}
              >
                <Title
                  style={{
                    color: "#353535",
                    textAlign: "center",
                    fontSize: "15px",
                    marginBottom: "20px",
                  }}
                >
                  {t("Resume.professional_experience")}
                </Title>
                <Form // Create a form for the experience
                  form={experienceForm}
                  name="experiences"
                  onFinish={handleAddOrUpdateExperience}
                  onFinishFailed={(errorInfo) => {
                    // Handle form validation errors
                    console.log("Validation échouée :", errorInfo); //  Log the error message
                  }}
                  labelCol={{ flex: "110px" }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{ flex: 1 }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Item
                    name="titre"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("Experienceform.requiredPosition"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("Experienceform.position")}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    name="societe"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("Experienceform.requiredCompany"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("Experienceform.company")}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    name="secteur"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("Experienceform.requiredActivitySector"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("Experienceform.sector")}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    name="lieu"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("Experienceform.requiredLocation"),
                      },
                    ]}
                  >
                    <Input placeholder={t("Resume.location")} maxLength={70} />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("Experienceform.no_description"),
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder={t("Experienceform.description")}
                      maxLength={200}
                      rows={3}
                    />
                  </Form.Item>
                  <Form.Item
                    name="dates"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("Experienceform.requiredDate"),
                      },
                    ]}
                  >
                    <RangePicker
                      format="YYYY-MM-DD"
                      placeholder={[
                        t("Experienceform.startDate"),
                        t("Experienceform.endDate"),
                      ]}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item label={null} className="form-button">
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#F68A67",
                        borderColor: "#F68A67",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "33px",
                        height: "33px",
                        marginBottom: "20px",
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
                </Form>{" "}
                {/* End form XP */}
              </Card>{" "}
              {/* End card XP */}
            </Col>{" "}
            {/* End col card XP */}
            <Col span={24}>
              <div>
                {localEducation.map((education) => (
                  <div
                    key={education.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Card
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        flex: 1,
                      }}
                    >
                      <ul
                        style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      >
                        <li>
                          <Text strong>{t("educationForm.degreeLevel")} :</Text>
                        </li>
                        <Text>{education.degree}</Text>
                        <li>
                          <Text strong>{t("educationForm.programName")} :</Text>
                        </li>
                        <Text>{education.programstudy}</Text>
                        <li>
                          <Text strong>{t("educationForm.institution")} :</Text>
                        </li>
                        <Text>{education.school}</Text> 
                        <li>
                          <Text strong>{t("educationForm.Date")} :</Text>
                        </li>
                        <Text>
                          {education.start_date
                            ? format(new Date(education.start_date), "MMMM yyyy") 
                            : t("educationForm.no_start_date")}{" "}
                          -{" "}
                          {education.end_date
                            ? format(new Date(education.end_date), "MMMM yyyy")
                            : t("educationForm.no_end_date")}
                        </Text>
                      </ul>
                    </Card>
                    <div
                      style={{
                        marginLeft: "16px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#F68A67",
                          borderColor: "#F68A67",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "33px",
                          height: "33px",
                          marginBottom: "20px",
                        }}
                      >
                        <EditOutlined
                          onClick={() => handleEditEducation(education)}
                        />
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#F68A67",
                          borderColor: "#F68A67",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "33px",
                          height: "33px",
                          marginBottom: "20px",
                        }}
                      >
                        <DeleteOutlined
                          onClick={() => handleDeleteEducation(education.id)}
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "340px",
                }}
              >
                <Title
                  style={{
                    color: "#353535",
                    textAlign: "center",
                    fontSize: "15px",
                    marginBottom: "20px",
                  }}
                >
                  {t("educationForm.school")}
                </Title>
                <Form
                  form={educationForm}
                  name="education"
                  onFinish={handleAddOrUpdateEducation}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Item
                    name="niveau"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("educationForm.requiredDegreeLevel"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("educationForm.degreeLevel")}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    name="filiere"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("educationForm.requiredProgramName"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("educationForm.programName")}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    name="etablissement"
                    style={{ width: "85%" }}
                    rules={[
                      {
                        required: true,
                        message: t("educationForm.requiredInstitution"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("educationForm.institution")}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    name="dates"
                    style={{ width: "85%" }}
                    rules={[
                      { required: true, message: t("educationForm.requiredDate") },
                    ]}
                  >
                    <RangePicker
                      format="YYYY-MM-DD"
                      placeholder={[t("educationForm.startDate"), t("educationForm.endDate")]}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item label={null} className="form-button">
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#F68A67",
                        borderColor: "#F68A67",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "33px",
                        height: "33px",
                        marginBottom: "20px",
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
                </Form>{" "}
                {/* End form Parcours scolaire */}
              </Card>{" "}
              {/* End card Parcours scolaire */}
            </Col>{" "}
            {/* End col card Parcours scolaire */}
          </Row>{" "}
          {/* End row col 1 */}
        </Col>{" "}
        {/* End first column */}
        <Col xs={24} md={12}>
          <Row gutter={[8, 45]}>
            <Col span={24}>
              <div>
                {localSkills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Card
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        flex: 1,
                      }}
                    >
                      <Text strong>{t("skillsForm.skill")} :</Text><Text>{skill.name}</Text>
                      <br />
                      <Text strong>{t("skillsForm.level")} :</Text> <Text>{skill.level}</Text>
                      <br />
                      <Text strong>{t("skillsForm.category")} :</Text> <Text>{skill.category}</Text>
                    </Card>
                  
                      <div
                      style={{
                        marginLeft: "16px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#F68A67",
                          borderColor: "#F68A67",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "33px",
                          height: "33px",
                          marginBottom: "20px",
                        }}
                        onClick={() => handleEditSkill(skill)}
                      >
                        <EditOutlined />
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#F68A67",
                          borderColor: "#F68A67",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "33px",
                          height: "33px",
                          marginBottom: "20px",
                        }}
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height : "280px"
                }}
              >
                <Title
                  style={{
                    color: "#353535",
                    textAlign: "center",
                    fontSize: "15px",
                    marginBottom: "20px",
                  }}
                >
                  {t("skillsForm.skill")}
                </Title>
                <Form
                  form={skillsForm}
                  name="competences"
                  onFinish={handleAddOrUpdateSkill}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Item
                    name="skill"
                    style={{ width: "85%" }}
                    rules={[
                      { required: true, message: t("skillsForm.noSkill") },
                    ]}
                  >
                    <Input
                      placeholder={t("skillsForm.addSkill")}
                      maxLength={15}
                    />
                  </Form.Item>
                  <Form.Item
                    name="level"
                    style={{ width: "85%" }}
                  >
                    <Select placeholder={t("skillsForm.level")}>
                      <Select.Option value={1}>1 - Débutant</Select.Option>
                      <Select.Option value={2}>2 - Intermédiaire</Select.Option>
                      <Select.Option value={3}>3 - Confirmé</Select.Option>
                      <Select.Option value={4}>4 - Avancé</Select.Option>
                      <Select.Option value={5}>5 - Expert</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="category"
                    style={{ width: "85%" }}
                  >
                    <Input placeholder={t("skillsForm.category")} maxLength={20} />
                  </Form.Item>
                  <Form.Item label={null} className="form-button">
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#F68A67",
                        borderColor: "#F68A67",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "33px",
                        height: "33px",
                        marginBottom: "20px",
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
                </Form>{" "}
                {/* End form Skills */}
              </Card>{" "}
              {/* End card Skills */}
            </Col>{" "}
            {/* End col card Skills */}
            <Col span={24}>
              <div>
                {localHobbies.map((hobby) => (
                  <div
                    key={hobby.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Col xs={24} md={12}>
                      <Card
                        style={{
                          borderRadius: "15px",
                          boxShadow: "3px 4px 9.9px 0px #A25C4526",
                        }}
                      >
                        <Text strong style={{ display: "inline" }}>
                          {hobby.name}
                        </Text>
                      </Card>
                    </Col>
                    <div
                      style={{
                        marginLeft: "16px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#F68A67",
                          borderColor: "#F68A67",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "33px",
                          height: "33px",
                          marginBottom: "20px",
                        }}
                        onClick={() => handleEditHobby(hobby)}
                      >
                        <EditOutlined />
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#F68A67",
                          borderColor: "#F68A67",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "33px",
                          height: "33px",
                          marginBottom: "20px",
                        }}
                        onClick={() => handleDeleteHobby(hobby.id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "215px",
                }}
              >
                <Title
                  style={{
                    color: "#353535",
                    textAlign: "center",
                    fontSize: "15px",
                    marginBottom: "20px",
                  }}
                >
                  {t("hobbies.hobbies")}
                </Title>
                <Form
                  form={hobbyForm}
                  name="loisirs"
                  onFinish={handleAddOrUpdateHobby}
                  labelCol={{ flex: "110px" }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{ flex: 1 }}
                  colon={false}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                <Form.Item
                    name="loisirs"
                    style={{ width: "85%" }}
                    rules={[{ required: true, message: t("hobbies.emptyField")}]}
                    extra={localHobbies.length === 0  ? t("hobbies.recommandation"): ""}
                  >
                    <Input
                      placeholder={t("hobbies.addHobby")}
                      maxLength={15}
                      value={hobby}
                      onChange={(e) => setHobby(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label={null} className="form-button">
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#F68A67",
                        borderColor: "#F68A67",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "33px",
                        height: "33px",
                        marginBottom: "20px",
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
                </Form>{" "}
                {/* End form Loisirs */}
              </Card>{" "}
              {/* End card Loisirs */}
            </Col>{" "}
            {/* End col card Loisirs */}
            <Col span={24}>
              <div>
              <Card
              style={{
                borderRadius: "15px",
                boxShadow: "3px 4px 9.9px 0px #A25C4526",
              }}
            >
             {localLocation && localLocation.length > 0 ? (
            <div>
              {localLocation.map((location) => (
                <Text key={location.id} strong>{`${location.city}, ${location.country}`}</Text>
              ))}
            </div>
          ) : (
            <Text>{t("Resume.no_location")}</Text>
          )}
            </Card>
              </div>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "230px",
                }}
              >
                <Title
                  style={{
                    color: "#353535",
                    textAlign: "center",
                    fontSize: "15px",
                    marginBottom: "20px",
                  }}
                >
                  {t("Resume.location")}
                </Title>
                <Form
                  form={locationForm}
                  name="localisation"
                  onFinish={handleSetLocation}
                  labelCol={{ flex: "110px" }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{ flex: 1 }}
                  colon={false}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Item
                    name="city"
                    style={{ width: "85%" }}
                    rules={[
                      { required: true, message: t("Resume.add_city") },
                    ]}
                  >
                    <Input placeholder={t("Resume.city")} maxLength={50} />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    style={{ width: "85%" }}
                    rules={[
                      { required: true, message: t("Resume.add_country") },
                    ]}
                  >
                    <Input placeholder={t("Resume.country")} maxLength={50} />
                  </Form.Item>
                  <Form.Item label={null} className="form-button">
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#F68A67",
                        borderColor: "#F68A67",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "33px",
                        height: "33px",
                        marginBottom: "20px",
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
                </Form>{" "}
                {/* End form Localisation */}
              </Card>{" "}
              {/* End card Localisation */}
            </Col>{" "}
            {/* End col card Localisation */}
          </Row>{" "}
          {/* End row col 2 */}
        </Col>{" "}
        {/* End second column */}
      </Row>{" "}
      {/* End row all*/}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          <Link href={`/portal/trainee/jobs/${id}/resume/import`}>
            <Button
              style={{
                backgroundColor: "#F68A67",
                borderColor: "#F68A67",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "bold",
                width: "228px",
                height: "61px",
                marginBottom: "20px",
                marginRight: "40px",
              }}
            >
              {t("Resume.preview")}
            </Button>
          </Link>
        </Col>
      </Row>
    </Content>
  );
}