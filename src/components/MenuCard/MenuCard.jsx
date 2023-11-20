import "./MenuCard.css";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from "@mui/material";
import {Link} from "react-router-dom";

export default function MenuCard(props) {

  return <Card sx={{ minWidth: 275 }}>
    <CardActionArea component={Link} to={props.route}>
    <CardContent>
      <Typography variant="body2">
        {props.title}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.body}
      </Typography>
    </CardContent>
    </CardActionArea>
  </Card>
}
