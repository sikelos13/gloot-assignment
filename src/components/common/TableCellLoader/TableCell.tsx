import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

export const TableCell = () => {
    return (
        <Box width="20%" mr={5}>
            <Box mb={5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
            <Box mb={5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
            <Box mb={5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
            <Box mb={5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
            <Box mb={5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </Box>
    )
}