
import log from '../../assets/images/log.png'
import { GiSevenPointedStar } from "react-icons/gi";
import { IoImageOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICompanyData, IState } from '@/interfaces/IUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import Cropper from "react-easy-crop";
import { Point, Area } from 'react-easy-crop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getCroppedImage } from '@/utils/crop/getCroppedimg';
import { uploadFile } from '@/utils/uploadfile/uploadDocument';
import { Loader } from '../common/loader';
import { useToast } from '@/components/ui/use-toast';
import { setProfileOneValidation } from '@/utils/validations/company/setProfileOneValidation';
import { editCompany } from '@/redux/actions/companyAction';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const SetProfileOne = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const [states, setStates] = useState<IState[]>()
    const { data, loading } = useSelector((state: RootState) => state.company)
    const [location, setLocation] = useState("")
    const [stack, setStack] = useState("")
    const [companyData, setCompanyData] = useState<ICompanyData | null>(data)
    const [load, setLoad] = useState(false)
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string>("");
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);


    const [error, setError] = useState({
        company_name: "",
        employees: "",
        industry: "",
        founded: "",
        website: "",
        location: "",
        tech_stack: "",
        description: ""
    })

    useEffect(() => {
        setCompanyData(data)
        if (!data?.icon) {
            setCompanyData((prev: any) => ({
                ...prev,
                icon: log
            }))
        }
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setImage(event.target.result as string);
                    handleOpen();
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        croppedArea;
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onSaveCroppedImage = async () => {
        if (!image || !croppedAreaPixels) return;
        try {
            const croppedImg: any = await getCroppedImage(image, croppedAreaPixels);

            setCompanyData((prev: any) => ({
                ...prev,
                profile: croppedImg
            }))
            handleClose();
            setLoad(true)
            const imglink = await uploadFile(croppedImg, "profile")
            setCompanyData((prev: any) => ({
                ...prev,
                icon: imglink
            }))
            setLoad(false)
            if (!imglink) {
                toast({
                    description: "Failed to upload profile at the moment!..",
                    className: "bg-red-600 text-white"

                })
                setCompanyData((prev: any) => ({
                    ...prev,
                    icon: log
                }))
            }
            console.log(imglink)
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setCompanyData((prev: any) => ({
            ...prev,
            [name]: String(value)
        }));
    };

    const handleLocation = () => {
        console.log(location)
        if (location.trim() !== "" && !companyData?.location?.includes(location)) {
            setCompanyData((prev: any) => ({
                ...prev,
                location: [
                    ...(prev?.location || []),
                    location
                ]
            }))

        }
    }

    const locationDelete = (value: any) => {
        if (companyData?.location) {
            const fill = companyData?.location.filter((val: any) => val !== value);
            setCompanyData((prev: any) => ({
                ...prev,
                location: [...fill]
            }))
        }
    }
    const stackDelete = (value: any) => {
        if (companyData?.tech_stack) {
            const fill = companyData?.tech_stack.filter((val: any) => val !== value);
            setCompanyData((prev: any) => ({
                ...prev,
                tech_stack: [...fill]
            }))
        }
    }

    const handleStack = () => {
        if (stack.trim() !== "" && !companyData?.tech_stack?.includes(stack)) {
            setCompanyData((prev: any) => ({
                ...prev,
                tech_stack: [
                    ...(prev?.tech_stack || []),
                    stack
                ]
            }))

        }
    }


    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                    headers: {
                        'X-CSCAPI-KEY': 'c2J0MHBQSlhRQjFJOWVCd3NlWVRLcTJjeTZMcFJ1cmFVcDd2SndlWg=='
                    }
                });
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, []);

    const handleSubmit = async () => {
        console.log(companyData, "company data")
        try {
            setError({
                company_name: "",
                employees: "",
                industry: "",
                founded: "",
                website: "",
                location: "",
                tech_stack: "",
                description: ""
            });


            await setProfileOneValidation.validate(companyData, { abortEarly: false });

            if (companyData && JSON.stringify(companyData) === JSON.stringify(data)) {
                toast({
                    description: "Profile is already up to date!",
                    className: "bg-blue-500 text-white rounded"
                });
                return;
            } else {

                if (companyData?.password) {
                    delete companyData.password
                }
                dispatch(editCompany(companyData as ICompanyData)).then(() => {
                    toast({
                        description: "Profile updated successfully....",
                        className: "bg-green-600 text-white rounded"

                    })
                }).catch(() => {
                    toast({
                        description: "please try again...",
                        className: "bg-red-600 text-white rounded"

                    })
                });

            }
        } catch (error: any) {
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                company_name: errors.company_name,
                employees: errors.employees,
                industry: errors.industry,
                founded: errors.founded,
                website: errors.website,
                location: errors.location,
                tech_stack: errors.tech_stack,
                description: errors.description
            }

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    };

    return (
        <>
            <div className="w-full flex-col">
                {loading || load && <Loader />}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, position: 'relative' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className='w-[500px] h-[500px]'>
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4 / 3}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                        </Typography>
                        <div className='w-full h-8 flex gap-4 justify-end absolute bottom-4 right-4 '>
                            <button onClick={handleClose} className='p-2 rounded border hover:bg-black hover:text-red-500 bg-red-500 flex justify-center items-center'>cancel</button>
                            <button onClick={onSaveCroppedImage} className='p-2 border rounded bg-green-500 hover:bg-black hover:text-green-500 flex justify-center items-center'>save</button>
                        </div>
                    </Box>
                </Modal>
                <div className="w-full h-14 pl-2 flex-col flex  border-b border-gray-200 justify-center">
                    <span className="font-bold">Basic Information</span>
                    <span className="text-gray-400 text-sm">This is company information that you can update anytime.</span>
                </div>
                <div className="w-full h-[400px] border-b border-gray-200  lg:h-56 pl-2 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2  h-full flex justify-between items-center pt-2">
                        <div className="w-1/2 flex flex-col">
                            <span className='font-bold'>Company Logo</span>
                            <span className='text-sm text-gray-400'>This image will be shown publicly as company logo !</span>
                        </div>
                        <div className=" w-52 h-52 rounded-full flex items-center justify-center">
                            <img src={companyData?.icon ? String(companyData.icon) : ""} className='h-full w-full rounded-full border-gray-200' alt="" />
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 justify-center lg:justify-start h-full pl-4 flex items-center'>
                        <label onChange={handleOpen} htmlFor="fileInput" className='w-[60%] h-[80%] border-2 border-dashed rounded border-customviolet flex flex-col justify-center items-center cursor-pointer'>
                            <input type="file" id="fileInput" className="hidden " accept="image/*" onChange={handleImageSelect} />
                            <IoImageOutline className='text-customviolet text-2xl' />
                            <span className='font-bold text-customviolet'>Click to replace</span>
                            <span className='text-sm text-gray-400'>SVG, PNG, JPG, or JPEG (max 400 x 400px)</span>
                        </label>
                    </div>

                </div>

                <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                    <div className='h-full w-full lg:w-1/4 pl-2 flex flex-col'>
                        <span className='font-bold'>Company Details</span>
                        <span className='text-sm text-gray-400'>introduce your company core info quickly to users by fill up company details.</span>
                    </div>
                    <div className='w-full m-2 lg:w-2/5 flex flex-col gap-6'>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Company Name<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input onChange={handleChange} type="text" name='company_name' value={String(companyData?.company_name)} className='w-full border p-2 bg-background rounded border-gray-400 h-10' />
                            <p className='text-xs text-red-500'>{error.company_name}</p>
                        </div>
                        <div className='flex w-full gap-1'>
                            <div className='w-1/2 flex flex-col gap-2'>

                                <div className='relative'>
                                    <span className='flex'>Employee<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                                    <select name='employees' onChange={handleChange} className='appearance-none w-full border rounded bg-background border-gray-400 h-10 px-4' defaultValue="">
                                        <option value='' disabled hidden>{companyData?.employees ? String(companyData.employees) : "Select an option"}</option>
                                        <option value='1-50'>1-50</option>
                                        <option value='50-100'>50-100</option>
                                        <option value='100-500'>100-500</option>
                                        <option value='500-1000'>500-1000</option>
                                        <option value='1000+'>1000+</option>
                                    </select>
                                    <p className='text-xs text-red-500'>{error.employees}</p>
                                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                                        <svg className='w-5 h-5 fill-current text-gray-400' viewBox='0 0 20 20'>
                                            <path d='M10 12L6 8h8l-4 4z' />
                                        </svg>
                                    </div>
                                </div>

                            </div>

                            <div className=' w-1/2 flex flex-col gap2'>
                                <div className='relative'>
                                    <span className='flex '>Industry<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                                    <select onChange={handleChange} name='industry' className='appearance-none w-full border rounded bg-background border-gray-400 h-10 px-4' defaultValue="">
                                        <option value='' disabled hidden>{companyData?.industry ? String(companyData.industry) : "Select an option"}</option>
                                        <option value='Information Technology (IT)'>Information Technology (IT)</option>
                                        <option value='Healthcare'>Healthcare</option>
                                        <option value='Finance and Banking'>Finance and Banking</option>
                                        <option value='Education'>Education</option>
                                        <option value='Retail'>Retail</option>
                                        <option value='Manufacturing'>Manufacturing</option>
                                        <option value='Automotive'>Automotive</option>
                                        <option value='Hospitality and Tourism'>Hospitality and Tourism</option>
                                        <option value='Energy and Utilities'>Energy and Utilities</option>
                                        <option value='Construction'>Construction</option>
                                        <option value='Real Estate'>Real Estate</option>
                                        <option value='Transportation and Logistics'>Transportation and Logistics</option>
                                        <option value='Aerospace and Defense'>Aerospace and Defense</option>
                                        <option value='Telecommunications'>Telecommunications</option>
                                        <option value='Media and Entertainment'>Media and Entertainment</option>
                                        <option value='Food and Beverage'>Food and Beverage</option>
                                        <option value='Pharmaceuticals'>Pharmaceuticals</option>
                                        <option value='Biotechnology'>Biotechnology</option>
                                        <option value='Agriculture'>Agriculture</option>
                                        <option value='Environmental Services'>Environmental Services</option>
                                    </select>
                                    <p className='text-xs text-red-500'>{error.industry}</p>
                                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                                        <svg className='w-5 h-5 fill-current text-gray-400' viewBox='0 0 20 20'>
                                            <path d='M10 12L6 8h8l-4 4z' />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex w-full gap-1'>
                            <div className='w-1/2 flex flex-col gap2'>
                                <span className='flex '>Date Founded<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                                <input onChange={handleChange} type="Date" name='founded' value={companyData?.founded ? companyData.founded.toLocaleString().split('T')[0] : ''} className='w-full p-2 bg-background border rounded border-gray-400 h-10' />
                                <p className='text-xs text-red-500'>{error.founded}</p>
                            </div>
                            <div className=' w-1/2 flex flex-col gap2'>
                                <span className='flex '>Website<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                                <input type="text" onChange={handleChange} name='website' value={String(companyData?.website)} className='w-full p-2 bg-background border rounded  border-gray-400 h-10' />
                                <p className='text-xs text-red-500'>{error.website}</p>
                            </div>

                        </div>


                        <div className='flex w-full gap-1'>
                            <div className='w-full flex flex-col gap-2'>

                                <div className='relative'>
                                    <span className='flex'>Location<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                                    <div className='flex gap-2'>
                                        <select onChange={(e) => setLocation(e.target.value)} className='appearance-none w-full border rounded bg-background border-gray-400 h-10 px-4' defaultValue="">
                                            <option value='' disabled hidden>Select locations</option>
                                            {states?.map((value: IState) => (
                                                <option value={value?.name}>{value?.name}</option>

                                            ))}

                                        </select>
                                        <button onClick={handleLocation} className='pt-2 pb-2 pl-12 pr-12 border rounded bg-customviolet text-white'>add</button>
                                    </div>
                                    <p className='text-xs text-red-500'>{error.location}</p>


                                </div>

                            </div>


                        </div>

                        <div className="flex flex-wrap gap-4">
                            {companyData?.location?.map((value, index) => (
                                <div className="p-1 flex bg-background" key={index}>
                                    {value}
                                    <RxCross2 onClick={() => locationDelete(value)} className="text-customviolet bg-background text-xl cursor-pointer" />
                                </div>
                            ))}


                        </div>
                        <div className='flex w-full gap-1'>
                            <div className='w-full flex flex-col gap-2'>

                                <div className='relative'>
                                    <span className='flex'>Tech Stack<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                                    <div className='flex gap-2'>
                                        <select onChange={(e) => setStack(e.target.value)} className='bg-background appearance-none w-full border rounded border-gray-400 h-10 px-4' defaultValue="">
                                            <option value='' disabled hidden>Select tech stacks</option>
                                            <option value="MERN Stack">MERN Stack</option>
                                            <option value="MEAN Stack">MEAN Stack</option>
                                            <option value="LAMP Stack">LAMP Stack</option>
                                            <option value="LEMP Stack">LEMP Stack</option>
                                            <option value="Django Stack">Django Stack</option>
                                            <option value="Ruby on Rails Stack">Ruby on Rails Stack</option>
                                            <option value="Flutter Stack">Flutter Stack</option>
                                            <option value="Vue.js Stack">Vue.js Stack</option>
                                            <option value="JAMstack">JAMstack</option>
                                            <option value="Spring Boot Stack">Spring Boot Stack</option>
                                            <option value="GraphQL Stack">GraphQL Stack</option>
                                            <option value="Laravel Stack">Laravel Stack</option>
                                            <option value="Ionic Stack">Ionic Stack</option>
                                            <option value="React Native Stack">React Native Stack</option>
                                            <option value="Symfony Stack">Symfony Stack</option>
                                            <option value="ASP.NET Stack">ASP.NET Stack</option>
                                            <option value="Ember.js Stack">Ember.js Stack</option>
                                            <option value="Meteor Stack">Meteor Stack</option>
                                            <option value="CakePHP Stack">CakePHP Stack</option>
                                            <option value="Express.js + MongoDB Stack">Express.js + MongoDB Stack</option>
                                            <option value="NestJS Stack">NestJS Stack</option>
                                            <option value="Svelte Stack">Svelte Stack</option>
                                            <option value="JHipster Stack">JHipster Stack</option>
                                            <option value="Flask Stack">Flask Stack</option>
                                            <option value="Phoenix Stack">Phoenix Stack</option>
                                            <option value="Gatsby Stack">Gatsby Stack</option>
                                            <option value="Nuxt.js Stack">Nuxt.js Stack</option>
                                            <option value="Sails.js Stack">Sails.js Stack</option>
                                            <option value="Quarkus Stack">Quarkus Stack</option>
                                            <option value="Feathers.js Stack">Feathers.js Stack</option>
                                            <option value="LoopBack Stack">LoopBack Stack</option>
                                            <option value="Stencil.js Stack">Stencil.js Stack</option>
                                            <option value="Polymer Stack">Polymer Stack</option>
                                            <option value="AdonisJS Stack">AdonisJS Stack</option>
                                            <option value="Dropwizard Stack">Dropwizard Stack</option>
                                            <option value="Rust + Rocket Stack">Rust + Rocket Stack</option>
                                            <option value="Kotlin + Ktor Stack">Kotlin + Ktor Stack</option>
                                            <option value="Hapi.js Stack">Hapi.js Stack</option>
                                            <option value="Fastify Stack">Fastify Stack</option>
                                            <option value="TypeORM Stack">TypeORM Stack</option>
                                            <option value="Ruby + Sinatra Stack">Ruby + Sinatra Stack</option>
                                            <option value="ROR + Vue.js Stack">ROR + Vue.js Stack</option>
                                            <option value="Next.js Stack">Next.js Stack</option>
                                            <option value="NestJS + GraphQL Stack">NestJS + GraphQL Stack</option>
                                            <option value="Flask + SQLAlchemy Stack">Flask + SQLAlchemy Stack</option>
                                            <option value="Spring Boot + JPA Stack">Spring Boot + JPA Stack</option>
                                            <option value="Joomla Stack">Joomla Stack</option>
                                            <option value="Drupal Stack">Drupal Stack</option>
                                            <option value="Magento Stack">Magento Stack</option>
                                            <option value="Shopify Stack">Shopify Stack</option>
                                            <option value="OpenCart Stack">OpenCart Stack</option>
                                            <option value="WooCommerce Stack">WooCommerce Stack</option>
                                            <option value="PrestaShop Stack">PrestaShop Stack</option>
                                            <option value="TYPO3 Stack">TYPO3 Stack</option>
                                            <option value="October CMS Stack">October CMS Stack</option>
                                            <option value="Concrete5 Stack">Concrete5 Stack</option>
                                            <option value="SilverStripe Stack">SilverStripe Stack</option>
                                            <option value="Laravel + Livewire Stack">Laravel + Livewire Stack</option>
                                            <option value="Drupal + React Stack">Drupal + React Stack</option>
                                            <option value="Joomla + Angular Stack">Joomla + Angular Stack</option>
                                            <option value="Magento + Vue.js Stack">Magento + Vue.js Stack</option>
                                            <option value="WordPress + React Stack">WordPress + React Stack</option>
                                            <option value="Shopify + Next.js Stack">Shopify + Next.js Stack</option>
                                            <option value="PrestaShop + Nuxt.js Stack">PrestaShop + Nuxt.js Stack</option>
                                            <option value="TYPO3 + Vue.js Stack">TYPO3 + Vue.js Stack</option>
                                            <option value="October CMS + React Stack">October CMS + React Stack</option>
                                            <option value="SilverStripe + Angular Stack">SilverStripe + Angular Stack</option>
                                            <option value="Kubernetes Stack">Kubernetes Stack</option>
                                            <option value="Docker Swarm Stack">Docker Swarm Stack</option>
                                            <option value="Elastic Stack">Elastic Stack</option>
                                            <option value="Ansible Stack">Ansible Stack</option>
                                            <option value="Terraform Stack">Terraform Stack</option>
                                            <option value="Chef Stack">Chef Stack</option>
                                            <option value="Puppet Stack">Puppet Stack</option>
                                            <option value="Jenkins Stack">Jenkins Stack</option>
                                            <option value="GitLab CI/CD Stack">GitLab CI/CD Stack</option>
                                            <option value="CircleCI Stack">CircleCI Stack</option>
                                            <option value="Travis CI Stack">Travis CI Stack</option>
                                            <option value="Grafana Stack">Grafana Stack</option>
                                            <option value="Prometheus Stack">Prometheus Stack</option>
                                            <option value="Zabbix Stack">Zabbix Stack</option>
                                            <option value="Nagios Stack">Nagios Stack</option>
                                            <option value="Graylog Stack">Graylog Stack</option>
                                            <option value="Splunk Stack">Splunk Stack</option>
                                            <option value="ELK Stack">ELK Stack</option>
                                            <option value="RabbitMQ Stack">RabbitMQ Stack</option>
                                            <option value="Apache Kafka Stack">Apache Kafka Stack</option>
                                            <option value="ZeroMQ Stack">ZeroMQ Stack</option>
                                            <option value="ActiveMQ Stack">ActiveMQ Stack</option>
                                            <option value="NATS Stack">NATS Stack</option>
                                            <option value="RocketMQ Stack">RocketMQ Stack</option>
                                            <option value="Redis Stack">Redis Stack</option>
                                            <option value="Memcached Stack">Memcached Stack</option>

                                        </select>

                                        <button onClick={handleStack} className='pt-2 pb-2 pl-12 pr-12 border rounded bg-customviolet text-white'>add</button>
                                    </div>
                                    <p className='text-xs text-red-500'>{error.tech_stack}</p>

                                </div>

                            </div>


                        </div>

                        <div className="flex flex-wrap gap-4">

                            {companyData?.tech_stack?.map((value, index) => (
                                <div className="p-1 bg-background flex" key={index}>
                                    {value}
                                    <RxCross2 onClick={() => stackDelete(value)} className="text-customviolet text-xl cursor-pointer" />
                                </div>
                            ))}




                        </div>

                    </div>
                </div>
                <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                    <div className='h-full w-full lg:w-1/4 pl-2 flex flex-col'>
                        <span className='font-bold'>About Company</span>
                        <span className='text-sm text-gray-400 '>Brief description for your company.URLs are hyperlinked.</span>
                    </div>
                    <div className='w-full m-2 lg:w-2/5 flex flex-col gap-6'>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex'>Description<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <textarea onChange={handleChange} name='description' value={String(companyData?.description ? companyData.description : "")} placeholder='Type something about company' className='w-full bg-background min-h-48 border rounded border-gray-400 px-4 py-2 resize-none'></textarea>
                            <p className='text-xs text-red-500'>{error.description}</p>
                            <p className='text-sm text-gray-400'>Maximum 500 character</p>
                        </div>

                    </div>
                </div>
                <div className='w-full flex justify-end pr-6 mt-10 pb-2'>
                    <button onClick={handleSubmit} className='p-2 border rounded text-white bg-customviolet hover:bg-white hover:text-customviolet'>Save Changes</button>
                </div>

            </div>
        </>
    )
}