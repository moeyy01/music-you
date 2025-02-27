import { useCallback, useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import PlayIcon from '@mui/icons-material/PlayArrow'

import { AnimatePresence, motion } from 'framer-motion'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { PlayCircleRounded } from '@mui/icons-material'
import { formatDate, formatDuring, formatNumber, sizeOfImage } from '@/util/fn'
import Image from '@/components/Image'
import type { Podcast, Program } from '@/types'
import { usePlayer } from '@/hooks/usePlayer'

function ProgramItem({ program, onPlay, onContextMenu }: {
  program: Program
  onPlay: (id: number) => void
  onContextMenu?: (e: React.MouseEvent<HTMLElement, MouseEvent>, program: Program) => void
}) {
  const [isHovering, setIsHovering] = useState(false)
  const theme = useTheme()
  return <Box
    sx={{
      'transition': 'background-color .35s ease',
      '&:hover': {
        bgcolor: alpha(theme.palette.surfaceVariant.main, 0.2),
      },
    }}
    className='grid grid-cols-2 gap-4 px-2 h-16 items-center cursor-pointer mb-1 rounded-lg'
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    onContextMenu={e => onContextMenu && onContextMenu(e, program)}
  >
    <div className='flex gap-2'>
      <div className='h-12 w-12 flex-shrink-0 relative'>
        <div className='h-full w-full rounded-xl overflow-hidden'>
          <Image src={sizeOfImage(program.coverUrl, 128)}/>
        </div>
        <AnimatePresence>
          {
            isHovering && <motion.div className='absolute top-0 h-12 w-12 flex justify-center items-center'
                                      initial={{ opacity: 0, transform: 'translateY(10px)' }}
                                      animate={{ opacity: 1, transform: 'translateX(0px)' }}
                                      exit={{ opacity: 0, transform: 'translateY(10px)' }}
                                      transition={{
                                        duration: 0.25,
                                        ease: [0.34, 1.56, 0.64, 1],
                                      }}
              >
                  <IconButton onClick={() => onPlay(program.id)}><PlayIcon color='primary'/></IconButton>
              </motion.div>
          }
        </AnimatePresence>
      </div>
      <div className='flex flex-col justify-center'>
        <Typography className='line-clamp-1' variant='body1'>{program.name}</Typography>
      </div>
    </div>
    <div className='grid grid-cols-4'>
      <Typography className='line-clamp-1' variant='subtitle2'><PlayCircleRounded fontSize='small' /> {formatNumber(program.listenerCount)}</Typography>
      <Typography className='line-clamp-1' variant='subtitle2'><ThumbUpAltIcon fontSize='small' /> { formatNumber(program.likedCount) }</Typography>
      <Typography className='line-clamp-1' variant='subtitle2'> {formatDate(program.createTime, 'YYYY-MM-DD') }</Typography>
      <Typography className='line-clamp-1' variant='subtitle2'> { formatDuring(program.duration) }</Typography>
    </div>
  </Box>
}

export default function ProgramList({ programs, className, podcast }: {
  programs: Program[]
  className?: string
  podcast?: Podcast
}) {
  const { player } = usePlayer()

  const handleTrackPlay = useCallback((trackId: number) => {
    player.updatePlayerTrack(trackId, true, true, false, { type: 'program', id: podcast.id })
  }, [programs])

  return <div className={className}>
    {
      programs?.length && programs.map((program) => {
        return <ProgramItem program={program} key={program.id} onPlay={handleTrackPlay} />
      })
    }
  </div>
}
