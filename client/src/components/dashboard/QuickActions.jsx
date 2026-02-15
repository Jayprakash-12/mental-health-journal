import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { itemVariants } from '../../data/dashboardData';

const QuickActions = ({ actions }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, idx) => {
                const Content = () => (
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="relative h-48 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                        onClick={action.action}
                    >
                        <div className="absolute inset-0">
                            <img src={action.img} alt={action.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className={`w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-white border border-white/10 group-hover:bg-white group-hover:text-emerald-600 transition-all duration-300`}>
                                <action.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-bold text-lg leading-none mb-1">{action.label}</h3>
                            <p className="text-white/60 text-xs font-medium">{action.desc}</p>
                        </div>
                    </motion.div>
                );

                return action.link ? (
                    <Link key={idx} to={action.link} className="block">
                        <Content />
                    </Link>
                ) : (
                    <Content key={idx} />
                );
            })}
        </div>
    );
};

export default QuickActions;
