export default function getError(err:Error) {

    // On production:
    if(process.env.NODE_ENV==="production") {
        return "Some error occurred, please try again later.";
    }
    if (typeof err === 'string') return err;
  
    // On development:
    return err.message;
}

