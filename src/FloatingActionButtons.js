import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import EcoIcon from '@material-ui/icons/Eco';
import AlbumIcon from '@material-ui/icons/OfflineBolt';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    
  },
}));

export default function FloatingActionButtons(props) {

  const classes = useStyles();
  return (
    <div style={{textAlign: "center"}}>
      {/* <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit" className={classes.fab}>
        <EditIcon />
      </Fab> */}
      {props.type === "play" &&  <Fab variant="extended"  style={{backgroundColor: "#00d680"}} aria-label="Press to Save" className={classes.fab} onClick={()=>props.btnClick()}>
        <EcoIcon className={classes.extendedIcon} />
        Go Sustainable
       </Fab>}
     {props.type === "record" &&  <Fab variant="extended"  style={{backgroundColor: "#ffe802"}} aria-label="record" className={classes.fab} onClick={()=>props.btnClick()}>
       <AlbumIcon className={classes.extendedIcon} />
        Analyse
      </Fab>}
      {/* <Fab disabled aria-label="delete" className={classes.fab}>
        <DeleteIcon />
      </Fab> */}
    </div>
  );
}
