import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({ data, title }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
		<Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          {title}
      	</Typography>
		{data.map((item, index) => (
			<Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`panel${index}bh-content`}
					id={`panel${index}bh-header`}
				>
					<Typography sx={{ width: '33%', flexShrink: 0 }}>{item.question}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>{item.answer}</Typography>
				</AccordionDetails>
			</Accordion>
		))}
    </div>
  );
}

const styles = {
	title: {
	  fontWeight: '400',
	  fontSize: '1.5rem',
	  color: 'gray',
	},
  };