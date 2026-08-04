/* ---------------------------------------------------------------------------
   Site copy for 7DT / 7DS.

   Sourced from the project reference documents in /reference:
     [A] Kim et al., "The 7-Dimensional Telescope and the 7-Dimensional Sky
         Survey: Status Report on Final Commissioning and Survey Operation",
         Proc. SPIE 14147-84.
     [B] Hyun et al., "Py7DT: Data Reduction Pipeline of the 7-Dimensional
         Telescope", Proc. SPIE 14155-12.
   Figures quoted below are the status as of June 2026.
--------------------------------------------------------------------------- */

/* --- Home page ----------------------------------------------------------- */

export const mainText1 =
  'The 7-Dimensional Sky Survey (7DS) is a medium-band survey of the southern sky. It \
is carried out with the 7-Dimensional Telescope (7DT), an array of twenty 50-cm \
telescopes at El Sauce Observatory in Chile, built and operated by the Center for the \
Gravitational-wave Universe at Seoul National University. Each unit carries a share of a \
forty-filter medium-band set, so a single visit records a low-resolution spectrum of \
every source in 1.25 square degrees. As of now, sixteen units and thirty-five filters \
are in routine operation.'

export const mainText2 =
  'A medium-band spectral energy distribution for every source in the field supports a \
wide range of science from one data product: how galaxies assemble and cease forming \
stars, where the heavy elements are produced, the expansion rate of the Universe, \
accretion onto black holes, the variability of young stars, and the composition of \
small solar-system bodies. 7DS was designed to identify gravitational-wave \
counterparts; the same images serve the rest.'

export const mainText3 =
  '7DS is divided into three components that trade area against depth and cadence: a \
single-visit reference map of the southern sky, a time-domain survey on a 10-14 day \
cadence, and nightly monitoring of a deep field at the south ecliptic pole. All three \
use the same tiling of the sky, so their data coadd directly.'

export const mainText4 =
  'Twenty DeltaRho 500 units on direct-drive mounts, sixteen currently observing, one \
control computer per operational telescope, a scheduler that can interrupt the night \
and begin a follow-up exposure in under a minute, and a pipeline that reduces a \
3,000-image night the same day. The array is built to observe a transient while it is \
still bright.'

/* --- About / 7DS overview ------------------------------------------------- */

export const surveyIntroText =
  '7DS is a spectral-mapping survey of the southern sky. Rather than measuring a few \
broadband colors, it images through medium-band filters of about 25 nm width, so each \
visit yields a spectral energy distribution at R = 30-70 for every source in the field. \
Applied over 23,000 square degrees, this produces a homogeneous low-resolution \
spectroscopic map of the southern sky, and applied repeatedly it measures how those \
spectra change with time.'

export const aboutMotivationText =
  'Most optical surveys measure a source in a few broad bands, which constrains its \
spectrum only weakly. Identifying what a source is — and, for anything that varies, \
what is changing about it — then requires spectroscopic follow-up on a larger \
telescope, which is expensive and cannot be applied to more than a small fraction of \
detections. The result is a large gap between the number of sources a survey finds and \
the number it can characterize.'

export const aboutMotivationText2 =
  '7DS closes that gap by putting the spectral information into the survey itself. \
Imaging through a set of medium bands rather than a few broad ones gives every source \
a low-resolution spectrum at the moment it is detected, for the whole field at once and \
without follow-up. The immediate motivation was the search for optical counterparts to \
gravitational-wave events, where candidates must be classified quickly and in large \
numbers; the same capability applies to any survey question that depends on knowing \
what a source is rather than only how bright it is.'

export const aboutApproachText =
  'The survey combines two capabilities that are usually separate. Spectral mapping: \
each visit samples the spectrum of every source in a 1.25 square-degree field at \
R = 30-70 between 375 and 875 nm, which is enough to locate the 4000 Angstrom break \
and strong emission lines, and so to estimate redshifts and stellar populations \
directly from imaging. Time domain: the same field can be revisited on cadences from \
one day to two weeks, so the spectral measurement becomes a time series rather than a \
single epoch.'

export const aboutApproachText2 =
  'Sampling a spectrum at this resolution costs exposures: a full medium-band set is \
many more frames than a broadband survey takes for the same field. The array is what \
makes that affordable, and the trade is set out under the telescope and the survey \
design.'

export const aboutText3 =
  'The name counts the measured axes of the data. Two of position on the sky, one of \
brightness, one of wavelength and one of time come directly from the observations; \
distance and radial velocity are derived from the medium-band spectral energy \
distribution. A single visit therefore records where a source is, how bright it is, \
what its spectrum looks like, and how both change with time.'

/* --- Science ------------------------------------------------------------- */

export const scienceOverviewText =
  'Two capabilities define what 7DS can answer. The first is spectral mapping: every \
visit samples the spectrum of every source in the field at R = 30-70 across 375 to 875 \
nm. That is coarse compared with a spectrograph, but it resolves the 4000 Angstrom \
break, strong emission lines and broad continuum features, and it applies to every \
object in 1.25 square degrees at once rather than to the few that fit on a slit.'

export const scienceOverviewText2 =
  'The second is the time domain. Because the spectral measurement is made by imaging, \
it can be repeated: the same field is revisited on cadences from one night to two \
weeks, so what is measured is not a spectrum but its evolution. Questions that need \
both at once — what a transient is while it is still bright, how an active galactic \
nucleus responds to its own variability, how a young star changes from night to night — \
are the ones this survey is built for.'

/* --- Survey -------------------------------------------------------------- */

export const surveyOverviewText =
  '7DS is the science program of 7DT. It comprises three surveys distinguished by area, \
cadence and depth: the Reference Imaging Survey (RIS), the Wide-area Time-domain Survey \
(WTS) and the Intensive Monitoring Survey (IMS). Across the three, area decreases and \
depth increases — from a single visit to the whole southern sky, to nightly observation \
of one field — while all three use the same instrument and the same tiling.'

export const surveyTilingText =
  'All 7DS observations use a common set of fixed pointings, generated from a HEALPix \
pixelization of the celestial sphere. Adjacent pointings overlap by about 5 arcminutes \
in right ascension and 4 arcminutes in declination near the celestial equator, and by \
more toward the poles. Tiles are numbered T00000 to T28519 in order of increasing \
declination, covering everything accessible to the array from the south celestial pole \
to +30 degrees.'

export const surveyTilingText2 =
  'This tiling is the operational reference for the whole program. WTS and IMS point at \
the same tile centers, and target-of-opportunity observations use them wherever the \
field allows. Because every component shares it, data from any of them coadd directly \
with data from the others and difference imaging always runs against a consistent \
reference. A visit is three consecutive 100-second exposures coadded to a 300-second \
frame; the exposure length is set by the unguided tracking capability of the mount and \
the read noise of the detector.'

/* surveyStatusText was removed when /survey/status became live: its figures
   (image counts, ToO totals) are now read from the portal, and a second copy
   in this file could only ever be out of date. */

/* --- Telescope ----------------------------------------------------------- */

export const telescopeOverviewText =
  '7DT is an array of twenty 50-cm commercial off-the-shelf telescopes. Each unit is a \
PlaneWave DeltaRho 500 optical tube assembly on an L-500 direct-drive mount in \
equatorial configuration, paired with a Moravian Instruments C3-61000 PRO CMOS camera. \
Units are identical except for the filters they carry. Sixteen of the twenty are \
deployed and operational as of June 2026; the remaining four complete the array. All \
operational units share a common configuration and show consistent optical performance \
in routine use.'

export const arrayDesignText =
  'Twenty commercial 50-cm units, each carrying a different share of the forty-filter \
medium-band set, cost a fraction of a purpose-built instrument, can be brought on line \
in stages, and can be reconfigured between science goals without hardware changes. \
Pointed together the units build a spectrum of one field; pointed apart they cover 25 \
square degrees at once.'

export const arrayDesignText2 =
  'Other multi-telescope arrays — GOTO, BlackGEM, LAST — take the same approach to \
off-the-shelf optics. What distinguishes 7DT is the filter set placed in front of them: \
40 medium bands of about 25 nm width spanning 375 to 900 nm, distributed across the \
array so that the full set is covered in a small number of exposures.'

export const locationText =
  'El Sauce Observatory sits in the Rio Hurtado Valley of Chile at 30 deg 28 min 16 \
sec South, 70 deg 45 min 47 sec West, 1,600 m above sea level. It neighbors the sites \
of Cerro Tololo Inter-American Observatory, Gemini South, the Southern Astrophysical \
Research Telescope and the Vera C. Rubin Observatory, and shares their sky conditions: \
typical seeing of about 1.5 arcseconds, more than 300 clear nights a year, and a mean \
zenith sky brightness of 21.97 mag per square arcsecond. Site infrastructure and \
maintenance are provided by ObsTech, a Chilean telescope hosting company.'

export const opticText =
  'Each unit is a PlaneWave DeltaRho 500, a corrected Cassegrain of 508 mm aperture \
with a focal length of 1,537 mm and a focal ratio of f/3.0. The design delivers a 70 mm \
image circle covering approximately 2.6 degrees - fast optics over a field far wider \
than a conventional research telescope of the same aperture. Optomechanical alignment \
of all sixteen operational units is complete, and image quality is monitored \
continuously through routine survey operations rather than in scheduled campaigns.'

export const mountText =
  'The DeltaRho 500 rides on a PlaneWave L-500 mount operated in equatorial \
configuration. Its direct-drive motors reach a slew rate of 20 degrees per second and \
sustain unguided tracking longer than the 100-second exposure used for survey work. \
Polar alignment is maintained through pointing models built by PWI4 from 40 to 50 sky \
points, and pointing and tracking accuracies are monitored continuously, with models \
refreshed when required.'

export const cameraText =
  'Each unit carries a Moravian Instruments C3-61000 PRO. Its back-illuminated SONY \
IMX455 CMOS sensor measures 36 by 24 mm with 9,576 by 6,388 pixels of 3.76 micron \
pitch. At the DeltaRho focal plane this gives a field of view of 1.34 by 0.90 degrees \
at a pixel scale of 0.5 arcseconds - about 1.25 square degrees of spectral mapping per \
pointing. Bias levels are consistent with the manufacturer specification of roughly \
3.5 electrons RMS, and the horizontal pattern characteristic of CMOS detectors is \
present but stable.'

export const filterText =
  'Every unit carries a nine-slot filter wheel. Three slots in each wheel hold Sloan \
g, r and i; one unit adds u and three units add z. The remaining slots hold \
medium-band filters, distributed across the array so that the full set is covered in a \
small number of exposures. The original twenty medium bands are spaced regularly at 25 \
nm from 400 to 875 nm with 25 nm FWHM. Fifteen more, procured from Edmund Optics and \
installed in late 2025, fill the gaps between them with central wavelengths from 412 \
to 832 nm and bandwidths of 14 to 41 nm. The current suite of 35 filters covers 375 to \
875 nm, advancing toward the designed complement of 40 medium bands at 12.5 nm \
spacing.'

export const filterCaveatText =
  'The additional fifteen filters depart from the regularity of the original set: \
their central wavelengths are not precisely aligned to the 12.5 nm grid, their \
bandwidths vary, and no filter between 700 and 800 nm is included in the second batch. \
These departures reflect availability and will be addressed as the remaining five \
filters become available. Their spectrophotometric calibration is in preparation; the \
original twenty remain the calibrated set in operational use.'

export const performanceText =
  'Across the sixteen operational units the point-spread function measured at field \
center on good nights ranges from 1.4 to 2.2 arcseconds FWHM, with an array median of \
2.0 arcseconds closely tracking the median site seeing. Unit-to-unit scatter in \
delivered FWHM is 0.2 arcseconds, and the PSF grows by 0.3 arcseconds from field \
center to corner while ellipticity stays below 0.1 over the central 80 percent of the \
field. Delivered image quality is therefore consistent across the array. Median \
delivered FWHM has held stable to within 0.3 arcseconds since routine survey operations \
began in July 2024.'

export const photometryText =
  'Photometric calibration runs against synthetic photometry derived from Gaia DR3 \
BP/RP spectra, homogenized to correct the color- and magnitude-dependent residuals \
reported by the Gaia collaboration. The procedure was established during commissioning \
on 68 spectrophotometric standard stars, including CALSPEC sources, with non-variable \
point sources selected following criteria adapted from SkyMapper DR4. Zero-point \
uncertainty across the twenty medium bands in operational use is 15 to 25 mmag, with \
the larger values redward of 775 nm where detector quantum efficiency falls and \
signal-to-noise drops accordingly.'

export const depthText =
  'For the canonical 100-second exposure the 5-sigma point-source depth reaches 19.06 \
mag in the bluest medium band (m400) and 16.60 mag at the longest wavelength (m875), \
peaking at 19.61 mag in m475 near maximum system throughput. The Sloan broad bands \
reach 20.59, 20.25 and 19.17 mag in g, r and i. These are nominal-condition figures: \
seeing better than 2.0 arcseconds, airmass below 1.5, and non-bright nights.'

export const modeText =
  'Because each unit carries its own filter complement, the array can be reconfigured \
between science goals without changing hardware. The full spectral range is covered by \
assigning different filter combinations to individual units and rotating through them \
during an observation. Four modes are in routine use; the choice between them trades \
spectral sampling, depth and sky coverage against one another.'

/* --- Computing and data -------------------------------------------------- */

export const computingText =
  'On-site computing consists of sixteen Telescope Control Computers, one per \
operational unit, and a single Main Control Computer that coordinates the array. Each \
TCC drives its own mount, camera, focuser and filter wheel and writes exposures to \
local storage as they complete. The MCC dispatches observation commands through \
RTCSpy, aggregates data from every TCC, and manages transfer to the processing facility \
at Seoul National University over KREONET.'

export const storageText =
  'A typical night yields about 3,000 raw frames of roughly 117 MiB each, some 350 GB \
before compression. Raw data are compressed on site and transferred by GridFTP at a \
typical 80 MB/s, a procedure that usually completes in under twelve hours; \
target-of-opportunity data skip the compression and the wait for sunrise, cutting \
latency to tens of minutes. Storage \
is provided by two servers named for the hydrogen transition series: Lyman, with two \
1.2 PB volumes, and Balmer, with one, for a combined capacity of approximately 3.6 PB. \
Both are attached to the compute server as NFS mounts over a 10 Gbps class network, so \
that I/O buffering does not burden processing.'

export const protonText =
  'All 7DT data are reduced on Proton, a dedicated server with dual AMD EPYC 7513 \
processors providing 128 cores at up to 2.6 GHz, 512 GB of memory, and two NVIDIA A100 \
GPUs sharing memory over NVLink. A nightly volume of roughly 3,000 raw images requires \
an effective per-image processing time of about 30 seconds to complete within the daily \
budget; the current pipeline sustains a median end-to-end throughput of 66 ± 24 GB per \
hour and clears a typical survey night in about five hours of wall-clock time after \
transfer completes. GPU acceleration is available for preprocessing, though in this \
deployment the throughput gain over the CPU path is minimal — the pipeline is bound by \
I/O rather than by computation.'

export const dataOverviewText =
  'Data flow from Chile to Seoul every night. Observation, reduction and analysis are \
closed into a single loop by three software systems: RTCSpy drives the array and \
schedules what it observes, Py7DT reduces what it acquires, and gwportal records the \
state of both. Three web interfaces expose that state to the team - a pipeline status \
page with real-time progress and quality-assurance summaries, a target-of-opportunity \
page carrying observation requests and event history, and a wiki hosting user manuals \
and QA criteria for internal and external users of 7DT data.'

export const dataProductText =
  'The basic data product of the survey is a 300-second coadd of three 100-second \
exposures, with a source catalog attached to every processed single, coadd and \
difference image. Coadds are flux-scaled to a zero point of 23.9 AB magnitudes, which \
puts each pixel directly in units of microjansky - a convenient convention for the \
pixel-based, IFU-like analysis that medium-band data invite. Quality-assurance metrics \
including seeing, ellipticity, 5-sigma depth and astrometric precision are written to \
FITS headers and ingested into the database for every image produced.'

export const pipelineText =
  'Py7DT is the operational data reduction pipeline. It addresses the reduction \
challenge specific to 7DT: heterogeneous data from many telescope units, filters and \
observing modes, reduced at survey throughput while keeping latency low for transient \
events. Orchestration modules group images by their properties into configurations \
backed by YAML files and submit them to an SQLite-based system queue, which dispatches \
them in parallel by priority and stage. Processing modules then run the standard \
sequence on each group, wrapping established astronomical software behind Python \
interfaces rather than reimplementing it.'

export const pipelineToOText =
  'Target-of-opportunity data are handled in the same framework at elevated priority. \
A ToO configuration is placed ahead of routine survey work in the queue, and for the \
highest-priority cases - typically broadband frames, where a rapid community report is \
valuable - all other processing pauses to dedicate the full system to the job. Users \
receive notification when raw data arrive, again as each filter set completes, and once \
more on full completion with an SED plot and magnitude table attached. Every ToO event \
is tracked in a dedicated database recording timestamps, progress and output products, \
and all ToO data are reprocessed alongside routine data in the next daily run to \
produce the deepest possible coadds.'

export const softwareReuseText =
  'Beyond its pipeline role, Py7DT is structured for offline reuse. Researchers inside \
and outside the 7DT team can run the same codebase to reprocess data with custom \
configurations, resuming from any stage of the reduction, and choose for themselves how \
far to trust the standard products. Images are passed through the pipeline as string \
paths with metadata in FITS headers and YAML files, rather than wrapped in a bespoke \
data model, which keeps products inspectable outside the pipeline and lowers the cost \
of learning to process 7DT data.'

/* --- Funding ------------------------------------------------------------- */

export const fundingGWText =
  'The 7-Dimensional Telescope is designed, built and operated by the Center for the \
Gravitational-wave Universe at Seoul National University. The Center is supported by \
National Research Foundation of Korea (MSIT).'

export const fundingNRFText =
  'Further project support is provided by the National Research Foundation of Korea (MSIT). \
Several members of the collaboration are additionally supported by individual NRF awards; \
those grants support the researchers rather than the facility, and are acknowledged in \
their own papers.'

export const fundingKASIText =
  '7DT is operated in part with support from special funding of the Korea Astronomy \
and Space Science Institute (KASI).'

export const fundingKreonetText =
  'Nightly transfer of roughly 350 GB of raw data from Chile to the processing \
facility in Seoul is carried by KREONET, the Korea Research Environment Open NETwork, \
operated by KISTI, the Korea Institute of Science and Technology Information. The 7DT \
project gratefully acknowledges this support, without which same-day reduction of \
survey and target-of-opportunity data would not be possible.'

/* --- Miscellaneous ------------------------------------------------------- */

export const publicationPolicyText =
  'The 7DS publication policy governs authorship, data rights and the acknowledgment \
of 7DT observations in refereed work. It is being prepared by the collaboration and \
will be posted here once ratified. In the meantime, anyone intending to publish results \
based on 7DT data is asked to contact the principal investigator so that the \
appropriate collaboration authors and funding acknowledgments can be agreed in \
advance.'

export const archiveText =
  'A complete record of 7DT data — every image type and source catalog — is \
maintained internally in the gwportal database, with the provenance of any product \
traceable back to the raw frames it was built from. There is no public archive \
interface yet: a public release of survey products is being prepared alongside the \
completion of the Reference Imaging Survey. Until then, data requests are handled \
directly by the project.'
