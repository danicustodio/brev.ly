import { motion } from 'framer-motion'

export const SubtleLoading = () => {
  return (
    <div className="w-full h-0.5 bg-transparent overflow-hidden relative">
      <motion.div
        className="h-full bg-blue-400 absolute"
        initial={{ x: '-90%' }}
        animate={{ x: '334%' }}
        exit={{ opacity: 0 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1,
          ease: 'linear',
        }}
        style={{ width: '30%' }}
      />
    </div>
  )
}
