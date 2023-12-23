import { useState } from "react";
import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  DialogActions,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: `1px solid ${theme.palette.primary.dark}`,
    color: theme.palette.grey.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.info.main,
      color: "#fff",
    },
    
  },
  included: {
    backgroundColor: theme.palette.info.main,
    color: "#fff",
  }
}));

const initialJobDetails = {
  company: "",
    experience: "Fresher",
    job_link: "",
    location: "Remote",
    skills: [],
    title: "",
    type: "Full Time",
  }

const NewJobs = (props) => {

  const [loading, setLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState(initialJobDetails);
  
  const handleChange = (e) =>{
    e.persist();
    setJobDetails(prevValue => ({
        ...prevValue,
        [e.target.name]: e.target.value,
    }))
  }

  const addRemoveSkill = (skill) => 
   jobDetails.skills.includes(skill)
    ? setJobDetails((oldState) => ({
      ...oldState, 
      skills: oldState.skills.filter(s=> s != skill ),
    }))
    : setJobDetails((oldState) => ({
      ...oldState, 
      skills: oldState.skills.concat( skill ),
    }))
   
  const handleSubmit = async () =>{
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  }

  const closeModal = () => {
     setJobDetails(initialJobDetails);
     setLoading(false);
     props.closeJObModal();
  }

  const classes = useStyles();

  const skills = [
    "JavaScript",
    "React",
    "Node",
    "Vue",
    "Firebase",
    "MongoDB",
    "SQL",
  ];
   console.log(jobDetails);

  return (
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box className="flex justify-between items-center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput onChange={handleChange} name="title" value={jobDetails.title} placeholder="Job Title*" disableUnderline fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Select 
              onChange={handleChange}
              fullWidth
              name="type" 
              value={jobDetails.type} 
              disableUnderline
              variant="filled"
              defaultValue="Full Time"
            >
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput onChange={handleChange}
            name="company"
             value={jobDetails.company} 
              placeholder="Company Name*"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select 
              onChange={handleChange}
              fullWidth
              name="location" 
              value={jobDetails.location} 
              disableUnderline
              variant="filled"
              defaultValue="Remote"
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-Office">In-Office</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput onChange={handleChange} name="job_link" value={jobDetails.job_link}  placeholder="Job Link*" disableUnderline fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Select 
              onChange={handleChange}
            name="experience" value={jobDetails.experience} 
              fullWidth
              disableUnderline
              variant="filled"
              defaultValue="Fresher"
            >
              <MenuItem value="Fresher">Fresher</MenuItem>
              <MenuItem value="Junior Level">Junior Level</MenuItem>
              <MenuItem value="Mid Level">Mid Level</MenuItem>
              <MenuItem value="Senior Level">Senior Level</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills</Typography>
          <Box className="flex">
            {skills.map((skill) => (
              <Box onClick={()=> addRemoveSkill(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`} key={skill}>
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box className="text-red-600 w-11/12 flex items-center justify-between mt-1 mr-5">
          <Typography variant="caption">*Required fields</Typography>
          <Button disabled={loading} onClick={handleSubmit} variant="contained" disableElevation color="primary">
            {loading ? (<CircularProgress color="secondary" size={22} />) : 
            ("Post Job")}  
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJobs;
